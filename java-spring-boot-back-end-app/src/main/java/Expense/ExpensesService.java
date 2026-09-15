package Expense;

import Budget.BudgetRepository;
import Models.Expense;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ExpensesService {

    private final ExpensesRepository expensesRepository;
    private final BudgetRepository budgetRepository;

    public ExpensesService(ExpensesRepository expensesRepository, BudgetRepository budgetRepository) {
        this.expensesRepository = expensesRepository;
        this.budgetRepository = budgetRepository;
    }

    public void createExpense(Expense expense) {
        if (expense == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expense payload is required.");
        }

        if (expense.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        if (expense.getBudgetId() != null && !budgetRepository.existsById(expense.getBudgetId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Budget ID " + expense.getBudgetId() + " does not exist.");
        }

        expensesRepository.createExpense(expense);
    }

    public List<Expense> getAllExpenses(Integer userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        return expensesRepository.findAllByUserId(userId);
    }

    public Optional<Expense> updateExpense(Integer id, Expense expenseDetails) {
        if (expenseDetails == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expense payload is required.");
        }

        if (expenseDetails.getBudgetId() != null && !budgetRepository.existsById(expenseDetails.getBudgetId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Budget ID " + expenseDetails.getBudgetId() + " does not exist.");
        }

        return expensesRepository.updateExpense(id, expenseDetails);
    }

    public boolean deleteExpense(Integer id) {
        return expensesRepository.deleteExpense(id);
    }
}

