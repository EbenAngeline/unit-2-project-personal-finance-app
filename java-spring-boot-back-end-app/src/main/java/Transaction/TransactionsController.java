package Transaction;

import Models.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    /**
     * Create a transaction
     *
     * POST /api/transactions
     */
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction) {

        Transaction createdTransaction =
                transactionsService.createTransaction(transaction);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTransaction);
    }

    /**
     * Get all transactions for a user
     *
     * GET /api/transactions?userId=1
     */
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(
            @RequestParam Integer userId) {

        List<Transaction> transactions =
                transactionsService.getAllTransactions(userId);

        return ResponseEntity.ok(transactions);
    }

    /**
     * Update a transaction
     *
     * PATCH /api/transactions/{id}
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Integer id,
            @RequestBody Transaction transactionDetails) {

        Transaction updatedTransaction =
                transactionsService.updateTransaction(id, transactionDetails);

        return ResponseEntity.ok(updatedTransaction);
    }

    /**
     * Delete a transaction
     *
     * DELETE /api/transactions/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Integer id) {

        transactionsService.deleteTransaction(id);

        return ResponseEntity.noContent().build();
    }
}