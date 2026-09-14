package Expense;



import Models.Expense;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpensesService {

    private final ExpensesRepository expensesRepository;

    public ExpensesService(ExpensesRepository expensesRepository) {
        this.expensesRepository = expensesRepository;
    }

    public void createExpense(Expense expense) {
        expensesRepository.createExpense(expense);
    }

    public List<Expense> getAllExpenses() {
        return expensesRepository.findAllExpenses();
    }

    public Optional<Expense> updateExpense(Integer id, Expense expenseDetails) {
        return expensesRepository.updateExpense(id, expenseDetails);
    }

    public boolean deleteExpense(Integer id) {
        return expensesRepository.deleteExpense(id);
    }
}

