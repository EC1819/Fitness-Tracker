# Fitness Tracker – rules for Claude Code

## About me
I'm a student learning backend development. I need to understand every line
in this project well enough to explain it in an interview.

## How to work with me
- Before writing code, explain your plan and wait for my approval.
- Work in small steps: one feature or file group at a time.
- After each change, explain what each new file does and why, in plain language.
- Point out any concept I haven't used yet (e.g. @OneToMany) and explain it.
- Do NOT commit or push. I review and commit myself.
- Do NOT change MetricsService or its tests unless I ask.

## Project
- Backend: Java 25, Spring Boot 4, Maven, PostgreSQL, in /backend
- Design: docs/design.md
- Package com.manny.fitness with: model, repository, dto, service, controller
- Follow the existing Profile and Measurement code as the pattern:
    - Entities in model/, constructor injection, @Service classes
    - Records for DTOs with jakarta.validation annotations
    - Controllers return ResponseEntity with correct status codes (201 for create,
      204 for delete, 404 for not found)
- Database: schema changes go in a NEW Flyway file (V2__..., V3__...).
  Never edit V1. ddl-auto is "validate".
- The DB password comes from the DB_PASSWORD environment variable. Never
  put real secrets in any file.
- Test endpoints with .http files in backend/http/.


Frontend
Stack
React + Vite, plain JavaScript (no TypeScript), in /frontend
Dev server: npm run dev on http://localhost:5173; backend on http://localhost:8080
Design
docs/frontend-design.md: screens, component tree, data table, state rules
Sketch: docs/frontend-sketch-v2.jpg
Patterns (follow src/ProfilePage.jsx)
Function components with useState and useEffect; plain fetch for API calls
Import API_URL from src/api.js; never hard-code the address
Screens go in src/screens/, reusable pieces in src/components/, one component per file
Use the exact JSON field names from the backend DTOs (e.g. measurementDate, bodyWeightLbs)
After saving or deleting, refetch the list instead of editing it locally
Every screen handles loading, empty lists, and errors with a clear message
A 400 inside a popup keeps the popup open and shows the error under the form
Rules
Don't add npm libraries without asking me first and explaining why
Don't change backend code; if the frontend needs an API change, tell me first
Plain CSS only until I ask otherwise
Explain each new React concept when you first use it