import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "@/lib/expenseStore";

// getting all expenses
export async function GET() {
  return Response.json(getExpenses());
}

// adding expense
export async function POST(req) {
  const data = await req.json();

  const newExpense = {
    id: Date.now(),
    ...data,
  };

  addExpense(newExpense);

  return Response.json({ success: true });
}

// deleting expense
export async function DELETE(req) {
  const { id } = await req.json();

  deleteExpense(id);

  return Response.json({ success: true });
}

// updating expense
export async function PUT(req) {
  const { id, updated } = await req.json();

  updateExpense(id, updated);

  return Response.json({ success: true });
}