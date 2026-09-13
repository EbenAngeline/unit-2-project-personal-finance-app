package Auth;

import Models.User;
import User.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> authenticate(String username, String password) {
        return userService.getUserByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
    }
}
