# I am going to create a JIRA like platform using techstack : ✅ ⌛

🚀 Phase 0: Define Scope (DON’T SKIP THIS)
There are in total 21 approx. task you have to complete.
Keep your MVP small.

🎯 Core Features (MVP)
1. User Authentication (Login/Register)
2. Create Project
3. Create Tasks (issues)
4. Task Status (To Do, In Progress, Done)
5. Basic Kanban Board
6. Assign task to user

👉 That’s it. No comments, no notifications yet.

🧱 Phase 1: Project Setup (Day 1–2)
🔹 Backend Setup
1. Initialize Node.js + Express ✅
2. Setup folder structure: ✅
/server
/controllers
/models
/routes
/middlewares
/config
3. install: ✅
npm install express mongoose dotenv cors bcrypt jsonwebtoken
4. Connect to MongoDB (Atlas) ✅
🔹 Frontend Setup
5. Create React app (use Vite for speed) ✅
Install:
npm install axios react-router-dom tailwindcss
6. Setup folder structure: ✅
/client
/components
/pages
/services
/store (optional)

🔐 Phase 2: Authentication (Day 2–3)
Backend
7. User Model: ✅
name
email
password (hashed)
APIs:
POST /register
POST /login
8. Add JWT middleware ✅
Frontend
Pages:
Login
Register
9. Store token in: ✅
localStorage (simple approach)
10. Protect routes (Private Routes) ✅
📁 Phase 3: Project Management (Day 3–4)
Backend 
11. Project Model: ✅
name
description
createdBy
12. APIs: ✅ 
Create project
Get user projects
Frontend
13. Dashboard Page: ✅
List projects
Create project modal
🧩 Phase 4: Task / Issue System (Day 4–6)
Backend
14. Task Model: ✅
title
description
status (todo / in-progress / done)
projectId
assignedTo
15. APIs: ✅
Create task
Get tasks by project
Update status
Delete task
Frontend
16. Project Detail Page: ✅
Show tasks grouped by status

📊 Phase 5: Kanban Board (Core Feature) (Day 6–7)

👉 This is your highlight feature.

17. Frontend ✅
3 Columns:
To Do
In Progress
Done
Display tasks in each column
18. OPTIONAL (Keep simple first)
Drag & Drop (use later) ⌛
library: dnd-kit or react-beautiful-dnd 

👉 For now: update status with dropdown/button ✅

👥 Phase 6: Assign Users (Day 7–8)  
Backend 
19. Add users to project by Admin ✅
Frontend 
20. Implement assign user to project feature on client side ✅
Backend
21. Assign tasks ✅
Frontend
21 Dropdown to assign user task ✅
🚀 Phase 8: Deployment (Day 9–10)
Backend → Render / Railway ✅
Frontend → Vercel / Netlify
⭐ Phase 9: Add 1–2 Advanced Features (Optional)

ONLY after MVP is done.

Pick any 1–2:

Drag & Drop
Comments on tasks
Due dates
Priority (Low, Medium, High)
Search & Filter

👉 Don’t add everything.
