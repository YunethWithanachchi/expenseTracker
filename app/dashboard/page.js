"use client";

import { useEffect, useState } from "react";

const COLORS = {
  bg: "#f7f8fc",
  card: "#ffffff",
  primary: "#3b5bdb",
  primaryLight: "#eef1ff",
  danger: "#e03131",
  dangerLight: "#fff5f5",
  warning: "#f59f00",
  warningLight: "#fff9db",
  text: "#1a1a2e",
  muted: "#868e96",
  border: "#e9ecef",
  green: "#2f9e44",
  greenLight: "#ebfbee",
};

const categoryColors = {
  food: "#f03e3e",
  transport: "#1971c2",
  shopping: "#9c36b5",
  bills: "#e67700",
  entertainment: "#2f9e44",
  other: "#495057",
};

const inputStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1.5px solid #e9ecef",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  color: "#1a1a2e",
  background: "#fff",
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  // to which expense is being edited
  const [editingId, setEditingId] = useState(null);

  const [filterCategory, setFilterCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const categories = ["food", "transport", "shopping", "bills", "entertainment", "other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  // Populating form with existing expense details
  const startEdit = (expense) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setDate(expense.date);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit and reset form
  const cancelEdit = () => {
    setEditingId(null);
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("food");
  };

  // Add or editing an expense
  const saveExpense = async () => {
    if (!description || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // UPDATE an existing
      await fetch("/api/expenses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          updated: { description, amount: Number(amount), category, date },
        }),
      });
      setEditingId(null);
    } else {
      // new expense
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount: Number(amount), category, date }),
      });
    }

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("food");
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const filteredExpenses = expenses.filter((e) => {
    const matchCategory = filterCategory === "all" || e.category === filterCategory;
    const matchDate = (!startDate || e.date >= startDate) && (!endDate || e.date <= endDate);
    return matchCategory && matchDate;
  });

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Georgia', serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: COLORS.text, margin: 0 }}>
            Expense Tracker
          </h1>
          <p style={{ color: COLORS.muted, marginTop: "4px", fontSize: "14px" }}>
            Track and manage your spending
          </p>
        </div>

        {/* Summary Card */}
        <div style={{
          background: COLORS.primary,
          borderRadius: "16px",
          padding: "24px 28px",
          marginBottom: "28px",
          color: "#fff",
        }}>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Total Spent
          </p>
          <h2 style={{ margin: "6px 0 0", fontSize: "36px", fontWeight: "bold" }}>
            ${total.toFixed(2)}
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: "13px", opacity: 0.7 }}>
            {expenses.length} transaction{expenses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Add / Edit Form */}
        <div style={{
          background: editingId ? COLORS.warningLight : COLORS.card,
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: editingId ? `1.5px solid ${COLORS.warning}` : "1.5px solid transparent",
          transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: COLORS.text }}>
              {editingId ? "Editing Expense" : "Add New Expense"}
            </h3>
            {/* Show cancel only in edit mode */}
            {editingId && (
              <button
                onClick={cancelEdit}
                style={{
                  background: "none",
                  border: "1.5px solid " + COLORS.warning,
                  color: COLORS.warning,
                  borderRadius: "8px",
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <input
              style={inputStyle}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              style={inputStyle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
            <input
              style={inputStyle}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              background: editingId ? COLORS.warning : COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={saveExpense}
          >
            {editingId ? "Save Changes" : "+ Add Expense"}
          </button>
        </div>

        {/* Filters */}
        <div style={{
          background: COLORS.card,
          borderRadius: "16px",
          padding: "16px 24px",
          marginBottom: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: COLORS.muted }}>Filter:</span>
          <select style={{ ...inputStyle, flex: 1, minWidth: "120px" }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <input style={{ ...inputStyle, flex: 1, minWidth: "130px" }} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input style={{ ...inputStyle, flex: 1, minWidth: "130px" }} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        {/* Expense List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredExpenses.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: COLORS.muted, fontSize: "14px" }}>
              No expenses found.
            </div>
          )}

          {filteredExpenses.map((e) => (
            <div key={e.id} style={{
              background: editingId === e.id ? COLORS.warningLight : COLORS.card,
              borderRadius: "14px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: editingId === e.id ? `1.5px solid ${COLORS.warning}` : "1.5px solid transparent",
              transition: "all 0.2s",
            }}>
              {/* Left */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "12px",
                  background: COLORS.primaryLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", fontWeight: "bold", color: COLORS.primary,
                }}>
                  {e.description?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "600", color: COLORS.text, fontSize: "15px" }}>
                    {e.description}
                  </p>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                    <span style={{
                      fontSize: "11px", padding: "2px 8px", borderRadius: "20px",
                      background: COLORS.primaryLight,
                      color: categoryColors[e.category] || COLORS.muted,
                      fontWeight: "600", textTransform: "capitalize",
                    }}>
                      {e.category}
                    </span>
                    <span style={{ fontSize: "12px", color: COLORS.muted }}>{e.date}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: "700", fontSize: "16px", color: COLORS.text }}>
                  ${Number(e.amount).toFixed(2)}
                </span>
                <button
                  style={{
                    background: editingId === e.id ? COLORS.warning : COLORS.warningLight,
                    color: "#fff",
                    border: "none", borderRadius: "8px",
                    padding: "6px 12px", cursor: "pointer",
                    fontSize: "13px", fontWeight: "600",
                  }}
                  onClick={() => startEdit(e)}
                >
                  {editingId === e.id ? "Editing..." : "Edit"}
                </button>
                <button
                  style={{
                    background: COLORS.dangerLight, color: COLORS.danger,
                    border: "none", borderRadius: "8px",
                    padding: "6px 12px", cursor: "pointer",
                    fontSize: "13px", fontWeight: "600",
                  }}
                  onClick={() => deleteExpense(e.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}