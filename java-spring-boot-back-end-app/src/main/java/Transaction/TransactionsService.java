package Transaction;

import Budget.BudgetRepository;
import Models.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionsService {

    private final TransactionsRepository transactionsRepository;
    private final BudgetRepository budgetRepository;

    public TransactionsService(TransactionsRepository transactionsRepository, BudgetRepository budgetRepository) {
        this.transactionsRepository = transactionsRepository;
        this.budgetRepository = budgetRepository;
    }

    public Transaction createTransaction(Transaction transaction) {
        if (transaction == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transaction payload is required.");
        }

        if (transaction.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        if (transaction.getBudgetId() != null && !budgetRepository.existsById(transaction.getBudgetId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Budget ID " + transaction.getBudgetId() + " does not exist.");
        }

        return transactionsRepository.createTransaction(transaction);
    }

    public List<Transaction> getAllTransactions(Integer userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        return transactionsRepository.findAllByUserId(userId);
    }

    public Optional<Transaction> updateTransaction(Integer id, Transaction transactionDetails) {
        if (transactionDetails == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transaction payload is required.");
        }

        if (transactionDetails.getBudgetId() != null
                && !budgetRepository.existsById(transactionDetails.getBudgetId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Budget ID " + transactionDetails.getBudgetId() + " does not exist.");
        }

        return transactionsRepository.updateTransaction(id, transactionDetails);
    }

    public boolean deleteTransaction(Integer id) {
        return transactionsRepository.deleteTransaction(id);
    }
}