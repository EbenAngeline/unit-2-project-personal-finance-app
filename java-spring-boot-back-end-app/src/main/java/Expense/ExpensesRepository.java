
package Expense;

import Models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpensesRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findAllByUserId(Integer userId);

    default List<Expense> findAllExpenses() {
        return findAll();
    }

    default void createExpense(Expense expense) {
        save(expense);
    }

    default Optional<Expense> updateExpense(Integer id, Expense expenseDetails) {
        Optional<Expense> existingExpense = findById(id);

        if (existingExpense.isEmpty()) {
            return Optional.empty();
        }

        Expense expense = existingExpense.get();
        expense.setUserId(expenseDetails.getUserId());
        expense.setDescription(expenseDetails.getDescription());
        expense.setCategory(expenseDetails.getCategory());
        expense.setType(expenseDetails.getType());
        expense.setAmount(expenseDetails.getAmount());
        expense.setDate(expenseDetails.getDate());
        expense.setBudgetId(expenseDetails.getBudgetId());

        return Optional.of(save(expense));
    }

    default boolean deleteExpense(Integer id) {
        boolean expenseExists = existsById(id);

        if (!expenseExists) {
            return false;
        }

        deleteById(id);
        return true;
    }
}

