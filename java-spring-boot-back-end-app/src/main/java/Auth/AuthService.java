package Auth;

import Budget.BudgetService;
import Models.Budget;
import Models.User;
import User.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class AuthService {

    private final UserService userService;
    private final BudgetService budgetService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, BudgetService budgetService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.budgetService = budgetService;
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

            User savedUser = userService.getUserByEmail(normalisedEmail)
                    .orElse(null);

            if (savedUser == null || savedUser.getId() == null) {
                return Optional.empty();
            }

            List<String> defaultBudgetNames = List.of(
                    "Groceries",
                    "Rent",
                    "Entertainment",
                    "Utilities",
                    "Transportation"
            );

            LocalDateTime now = LocalDateTime.now();
            for (String budgetName : defaultBudgetNames) {
                Budget budget = new Budget(savedUser.getId(), budgetName, BigDecimal.valueOf(100), now);
                budgetService.createBudget(budget);
            }

            return Optional.of(savedUser);
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
