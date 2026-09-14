const mockTransactions = [
  {
    id: 1,
    date: "2025-01-03",
    description: "Weekly groceries",
    category: "Groceries",
    type: "Expense",
    amount: -85.5,
  },
  {
    id: 2,
    date: "2025-01-04",
    description: "Rent payment",
    category: "Rent",
    type: "Expense",
    amount: -1200,
  },
  {
    id: 3,
    date: "2025-01-05",
    description: "Movie night",
    category: "Entertainment",
    type: "Expense",
    amount: -45,
  },
  {
    id: 4,
    date: "2025-01-06",
    description: "Electric bill",
    category: "Utilities",
    type: "Expense",
    amount: -80,
  },
  {
    id: 5,
    date: "2025-01-07",
    description: "Bus pass",
    category: "Transportation",
    type: "Expense",
    amount: -25,
  },
  {
    id: 6,
    date: "2025-01-08",
    description: "Salary deposit",
    category: "Salary",
    type: "Income",
    amount: 7000,
  },
];

export const budgetLimits = {
  Groceries: 450,
  Rent: 1200,
  Entertainment: 150,
  Utilities: 250,
  Transportation: 300,
};

export default mockTransactions;
