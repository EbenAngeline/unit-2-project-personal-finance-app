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

    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        List<Budget> budgets = budgetService.getAllBudgets();
        return ResponseEntity.ok(budgets);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateBudget(
            @PathVariable Integer id,
            @RequestBody Budget budgetDetails) {
        boolean updated = budgetService.updateBudget(id, budgetDetails).isPresent();

        if (!updated) {
            return ResponseEntity.notFound().build();
        }

        String message = "Budget updated successfully.";
        return ResponseEntity.ok(message);
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
