package Auth;

import Budget.BudgetService;
import Models.Budget;
import Models.User;
import User.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class AuthService {

    private static final List<String> DEFAULT_BUDGET_NAMES = List.of(
            "Groceries",
            "Rent",
            "Entertainment",
            "Utilities",
            "Transportation"
    );
    private static final BigDecimal DEFAULT_BUDGET_AMOUNT = BigDecimal.valueOf(100);

    private final UserService userService;
    private final BudgetService budgetService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, BudgetService budgetService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.budgetService = budgetService;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> authenticate(String email, String password) {
        String normalizedEmail = normalizeEmail(email);
        return userService.getUserByEmail(normalizedEmail)
                .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
    }

    @Transactional
    public Optional<User> signup(String email, String password) {
        String normalizedEmail = normalizeEmail(email);

        if (userService.getUserByEmail(normalizedEmail).isPresent()) {
            return Optional.empty();
        }

        User newUser = new User(normalizedEmail, passwordEncoder.encode(password));
        User savedUser = userService.createUserAndReturn(newUser);
        createDefaultBudgets(savedUser.getId());
        return Optional.of(savedUser);
    }

    private void createDefaultBudgets(Integer userId) {
        LocalDateTime now = LocalDateTime.now();

        for (String budgetName : DEFAULT_BUDGET_NAMES) {
            Budget budget = new Budget(userId, budgetName, DEFAULT_BUDGET_AMOUNT, now);
            budgetService.createBudget(budget);
        }
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            return null;
        }
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
