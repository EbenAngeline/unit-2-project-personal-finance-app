package Transaction;

import Models.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionsController {

    private final TransactionsService transactionsService;

    public TransactionsController(TransactionsService transactionsService) {
        this.transactionsService = transactionsService;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction createdTransaction = transactionsService.createTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(@RequestParam Integer userId) {
        List<Transaction> transactions = transactionsService.getAllTransactions(userId);
        return ResponseEntity.ok(transactions);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateTransaction(
            @PathVariable Integer id,
            @RequestBody Transaction transactionDetails) {
        boolean updated = transactionsService.updateTransaction(id, transactionDetails).isPresent();

        if (!updated) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Transaction updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Integer id) {
        boolean deleted = transactionsService.deleteTransaction(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Transaction deleted successfully.");
    }
}