package Budget;

import Models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {

    default List<Budget> findAllBudgets() {
        return findAll();
    }

    default void createBudget(Budget budget) {
        save(budget);
    }

    default Optional<Budget> updateBudget(Integer id, Budget budgetDetails) {
        Optional<Budget> existingBudget = findById(id);

        if (existingBudget.isEmpty()) {
            return Optional.empty();
        }

        Budget budget = existingBudget.get();
        budget.setUserId(budgetDetails.getUserId());
        budget.setCategory(budgetDetails.getCategory());
        budget.setAmount(budgetDetails.getAmount());
        budget.setDate(budgetDetails.getDate());

        return Optional.of(save(budget));
    }

    default boolean deleteBudget(Integer id) {
        boolean budgetExists = existsById(id);

        if (!budgetExists) {
            return false;
        }

        deleteById(id);
        return true;
    }
}
