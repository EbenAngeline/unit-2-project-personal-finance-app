package Budget;

import Models.Budget;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<String> createBudget(@RequestBody Budget budget) {
        budgetService.createBudget(budget);
        String message = "Budget created successfully.";
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Budget>> getBudgetsByUserId(@PathVariable Integer userId) {
        List<Budget> budgets = budgetService.getBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }

    @PatchMapping("/user/{userId}/budget/{budgetId}")
    public ResponseEntity<String> updateBudgetByUserAndBudget(
            @PathVariable Integer userId,
            @PathVariable Integer budgetId,
            @RequestBody Budget budgetDetails) {
        if (budgetDetails == null || budgetDetails.getAmount() == null) {
            return ResponseEntity.badRequest().body("Amount is required.");
        }

        boolean updated = budgetService.updateBudget(budgetId, userId, budgetDetails).isPresent();

        if (!updated) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Budget updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBudget(@PathVariable Integer id) {
        boolean deleted = budgetService.deleteBudget(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        String message = "Budget deleted successfully.";
        return ResponseEntity.ok(message);
    }
}
