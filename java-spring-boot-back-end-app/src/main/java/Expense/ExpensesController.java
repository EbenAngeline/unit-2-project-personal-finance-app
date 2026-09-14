package Expense;

import Models.Expense;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

    private final ExpensesService expensesService;

    public ExpensesController(ExpensesService expensesService) {
        this.expensesService = expensesService;
    }

    @PostMapping
    public ResponseEntity<String> createExpense(@RequestBody Expense expense) {
        expensesService.createExpense(expense);
        String message = "Expense created successfully.";
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expensesService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateExpense(
            @PathVariable Integer id,
            @RequestBody Expense expenseDetails) {
        boolean updated = expensesService.updateExpense(id, expenseDetails).isPresent();

        if (!updated) {
            return ResponseEntity.notFound().build();
        }

        String message = "Expense updated successfully.";
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Integer id) {
        boolean deleted = expensesService.deleteExpense(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        String message = "Expense deleted successfully.";
        return ResponseEntity.ok(message);
    }
}

