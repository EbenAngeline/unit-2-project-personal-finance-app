package Transaction;

import Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionsRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByUserId(Integer userId);

    default Transaction createTransaction(Transaction transaction) {
        return save(transaction);
    }

    default Optional<Transaction> updateTransaction(Integer id, Transaction transactionDetails) {
        Optional<Transaction> existingTransaction = findById(id);

        if (existingTransaction.isEmpty()) {
            return Optional.empty();
        }

        Transaction transaction = existingTransaction.get();
        transaction.setUserId(transactionDetails.getUserId());
        transaction.setDescription(transactionDetails.getDescription());
        transaction.setCategory(transactionDetails.getCategory());
        transaction.setType(transactionDetails.getType());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setDate(transactionDetails.getDate());
        transaction.setBudgetId(transactionDetails.getBudgetId());

        return Optional.of(save(transaction));
    }

    default boolean deleteTransaction(Integer id) {
        boolean transactionExists = existsById(id);

        if (!transactionExists) {
            return false;
        }

        deleteById(id);
        return true;
    }
}