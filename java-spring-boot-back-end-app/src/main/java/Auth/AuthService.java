package Auth;

import Models.User;
import User.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
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
        String normalisedEmail = normalizeEmail(email);
        return userService.getUserByEmail(normalisedEmail)
                .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
    }

    public Optional<User> signup(String email, String password) {
        String normalisedEmail = normalizeEmail(email);

        if (userService.getUserByEmail(normalisedEmail).isPresent()) {
            return Optional.empty();
        }

        User user = new User(normalisedEmail, passwordEncoder.encode(password));

        try {
            userService.createUser(user);
            return Optional.of(user);
        } catch (DataIntegrityViolationException ex) {
            return Optional.empty();
        }
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            return null;
        }
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
