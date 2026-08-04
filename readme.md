# MongoDB + Mongoose CRUD Project — Session Report

**Date:** August 4, 2026
**Project:** mongoose-crud-practice
**Goal:** Learn MongoDB fundamentals and build a full CRUD API with Express + Mongoose

---

## 1. Database Setup

- Installed and connected MongoDB driver in WebStorm's Database tool
- Practiced locally first: created `firstdb` database with `first-collection`, inserted dummy documents using WebStorm's Mongo console (`insertOne`, `insertMany`)
- Moved to MongoDB Atlas (cloud) for the real project
- Connected Atlas cluster to WebStorm using the SRV connection string (URL only mode)
- **Security note:** rotated the Atlas database user password after accidentally sharing it in plain text — good habit to repeat if this happens again

---

## 2. Project Setup

```bash
mkdir mongoose-crud-practice
cd mongoose-crud-practice
npm init -y
npm install express mongoose dotenv
npm install -D nodemon
```

- Used ES Modules (`import`/`export`) instead of CommonJS, set via `"type": "module"` in `package.json`
- Folder structure:
```
mongoose-crud-practice/
├── config/
│   └── db.js
├── models/
│   └── Student.js
├── controllers/
│   └── studentController.js
├── routes/
│   └── studentRoutes.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

---

## 3. Database Connection

`config/db.js` connects to MongoDB Atlas via Mongoose, using `process.env.MONGO_URI` from `.env`. Connection failure calls `process.exit(1)` — the app doesn't run without a working database, rather than serving broken requests silently.

---

## 4. Student Schema

| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique |
| age | Number | required |
| department | String | required |
| cgpa | Number | min 0, max 4 |
| isActive | Boolean | defaults to true |

`timestamps: true` auto-adds `createdAt` and `updatedAt`.

---

## 5. CRUD Endpoints Built

| Action | Method | Route |
|---|---|---|
| Create student | POST | `/api/students` |
| Get all students | GET | `/api/students` |
| Get single student | GET | `/api/students/:id` |
| Update student | PUT | `/api/students/:id` |
| Delete student | DELETE | `/api/students/:id` |

Key implementation details:
- `findByIdAndUpdate` uses `{ new: true, runValidators: true }` — returns the updated doc (not the stale pre-update one) and re-applies schema validation on update
- All 404 cases handled explicitly (e.g. deleting/updating a non-existent id)
- Errors caught with try/catch, appropriate status codes returned (400 for validation errors, 404 for not found, 500 for server errors)

---

## 6. Testing

- Tested all 5 endpoints in Postman
- Fixed a real 404 bug caused by a URL typo (`/api/sudents` instead of `/api/students`) — confirmed how to read Express's "Cannot POST /path" error to diagnose route mismatches
- Seeded 6 dummy students with varied departments, ages, cgpa, and active status for realistic testing data

---

## 7. Version Control

```bash
git init
git add .
git commit -m "Add Student model and CRUD routes with Mongoose"
git push
```

- `.gitignore` includes `node_modules` and `.env` — confirmed credentials never reach GitHub
- Verified on GitHub that sensitive files were excluded after push

---

## Key Takeaways

1. **MongoDB is schemaless at the database level** — Mongoose is what enforces structure and validation in your app, not MongoDB itself
2. **`new: true` and `runValidators: true`** are easy to forget on updates and cause confusing "it didn't work" bugs if left out
3. **Atlas connection strings need the database name added manually** — the string Atlas gives you by default only has `/` with no db name
4. **Never paste real credentials into chat or commits** — rotate immediately if it happens
5. **404 "Cannot POST/GET" errors are almost always a URL/route mismatch**, not a real server failure — check the URL against your route file first

---

## Next Steps

- Add input validation middleware (e.g. `express-validator`) before data hits the controller
- Add error-handling middleware to centralize error responses instead of repeating try/catch in every controller
- Consider pagination and filtering on `getAllStudents` for larger datasets
- Explore Cloudinary + file upload integration for student profile images (connects to your existing `pern-file-storage-practice` learnings)
