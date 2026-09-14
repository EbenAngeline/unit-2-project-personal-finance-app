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

    public Optional<User> authenticate(String email, String password) {
        return userService.getUserByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
    }

    public Optional<User> signup(String email, String password) {
        if (userService.getUserByEmail(email).isPresent()) {
            return Optional.empty();
        }

        User user = new User(email, passwordEncoder.encode(password));
        userService.createUser(user);
        return Optional.of(user);
    }
}
