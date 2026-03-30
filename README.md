# Expense Tracker (Next.js)

## Overview

A full-stack expense tracking application(without database connection) built with Next.js (App Router).
Users can log in, manage expenses, and view summaries with filtering and UI enhancements.

---

## Features

* Login with token-based authentication
* Add, edit, delete expenses
* Fields: amount, description, category, date
* Category filtering and date range filtering
* Total expense calculation

---

## Tech Stack

* Next.js (React, App Router)
* Node.js (via Next.js API routes)
* Tailwind CSS
* React Hooks & Context API

---

## Project Structure

```
app/
 ├── dashboard/page.js        # Dashboard UI
 ├── login/page.js            # Login page
 ├── api/expenses/route.js    # API routes (backend logic)
 ├── lib/expenseStore.js      # In-memory data store (service layer)
```

---

## Running the Project

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000/login
```

---

## Authentication Approach

* A simple token is generated on login and stored in localStorage
* Protected routes check for token presence and redirect if missing



### Production Improvements

* Use HTTP-only cookies instead of localStorage
* Implement JWT-based authentication
* Add middleware-based route protection

---

## Design Decisions

* Used Next.js API routes to simulate backend functionality
* Separated logic into UI, API, and service layer (`expenseStore`)
* Used in-memory storage for simplicity and speed
* Structured to allow easy database integration later

---

## Limitations

* Data is not persistent (resets on server restart)
* Authentication is not secure for production use

---

## Improvements (With More Time)

* Integrate a database (MongoDB/PostgreSQL)
* Add charts for expense visualization
* Improve UI/UX and responsiveness
* Dark mode preference
* Implement server actions for cleaner data handling
