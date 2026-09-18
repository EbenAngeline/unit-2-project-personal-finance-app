package Budget;

import Models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {

    List<Budget> findByUserId(Integer userId);

    default List<Budget> findBudgetsByUserId(Integer userId) {
        return findByUserId(userId);
    }

    default void createBudget(Budget budget) {
        save(budget);
    }

    default Optional<Budget> updateBudget(Integer id, Integer userId, Budget budgetDetails) {
        Optional<Budget> existingBudget = findById(id);

        if (existingBudget.isEmpty()) {
            return Optional.empty();
        }

        Budget budget = existingBudget.get();
        if (!java.util.Objects.equals(budget.getUserId(), userId)) {
            return Optional.empty();
        }

        if (budgetDetails.getAmount() != null) {
            budget.setAmount(budgetDetails.getAmount());
        }

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
