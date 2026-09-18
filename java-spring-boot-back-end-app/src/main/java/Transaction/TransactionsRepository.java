package Transaction;

import Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionsRepository
        extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByUserId(Integer userId);

    default Transaction createTransaction(Transaction transaction) {
        return save(transaction);
    }

    default Optional<Transaction> updateTransaction(
            Integer id,
            Transaction transactionDetails) {

        Optional<Transaction> existingTransaction =
                findById(id);

        if (existingTransaction.isEmpty()) {
            return Optional.empty();
        }

        Transaction transaction =
                existingTransaction.get();


        if (transactionDetails.getUserId() != null) {
            transaction.setUserId(
                    transactionDetails.getUserId()
            );
        }

        if (transactionDetails.getDescription() != null) {
            transaction.setDescription(
                    transactionDetails.getDescription()
            );
        }

        if (transactionDetails.getCategory() != null) {
            transaction.setCategory(
                    transactionDetails.getCategory()
            );
        }

        if (transactionDetails.getAmount() != null) {
            transaction.setAmount(
                    transactionDetails.getAmount()
            );
        }

        if (transactionDetails.getDate() != null) {
            transaction.setDate(
                    transactionDetails.getDate()
            );
        }

        if (transactionDetails.getBudgetId() != null) {
            transaction.setBudgetId(
                    transactionDetails.getBudgetId()
            );
        }

        return Optional.of(save(transaction));
    }

    /**
     * Delete a transaction.
     *
     * deleteById() throws an exception when the entity does not exist,
     * so we first verify existence and then delete it.
     */
    default boolean deleteTransaction(Integer id) {

        if (!existsById(id)) {
            return false;
        }

        deleteById(id);

        return true;
    }
}