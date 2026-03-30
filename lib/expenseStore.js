let expenses = [];

export function getExpenses() {
  return expenses;
}

export function addExpense(expense) {
  expenses.push(expense);
}

export function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
}

export function updateExpense(id, updated) {
  expenses = expenses.map(e =>
    e.id === id ? { ...e, ...updated } : e
  );
}