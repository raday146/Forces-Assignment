# Forces-Assignment

## 🚀 Features & Optimizations
* **Lazy-Loading Tree:** Loads root-level units on init. Sub-units are fetched from the API **only when expanded** to prevent frontend memory bloat.
* **Recursive Path Search:** Uses a database-level **PostgreSQL Recursive CTE** to fetch the matched unit and its entire ancestry chain in a single query, eliminating expensive backend application loops.
* **Decoupled Architecture:** Clean, typed component split (`searchComp`, `TreeNode`, `App`).

## ⚠️ Pending Refinements
* **Backend:** Search query currently uses structural positional bindings (`$1`). Future improvement: Migrate fully to TypeORM's dynamic Parameter Map.
* **Frontend:** Results show the exact chain text. Future UX polish: Auto-expand and scroll to the target node directly inside the active tree view.

## 🛠️ Tech Stack
* React, TypeScript, Vite, Axios
* Node.js (v22), Express, TypeORM, `tsx`
* PostgreSQL 17 + Docker Compose

## 🏃‍♂️ Quick Start

1. **Backend  - Docker :**
   ```bash
   docker-compose up --build -d
   
  ``
  
1. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
  ``
