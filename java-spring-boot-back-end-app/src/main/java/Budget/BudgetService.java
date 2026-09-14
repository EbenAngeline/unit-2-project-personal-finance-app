package Budget;

import Models.Budget;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public void createBudget(Budget budget) {
        budgetRepository.createBudget(budget);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAllBudgets();
    }

    public Optional<Budget> updateBudget(Integer id, Budget budgetDetails) {
        return budgetRepository.updateBudget(id, budgetDetails);
    }

    public boolean deleteBudget(Integer id) {
        return budgetRepository.deleteBudget(id);
    }
}
