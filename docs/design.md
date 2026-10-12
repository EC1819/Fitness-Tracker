# Fitness Tracker – Design Doc

## 1. Overview
- What does the app do, in 2–3 sentences?

This app will allow users to track the exercises that they have done and have them neatly organized separated by day.
User would be able to input their bio information such as height, weight, gender, and calculate how strong they are
based on their demographic percentiles and muscle group & global aggregation. The application would show a trend chart showing users overtime how their strength has increased
over time and using a formula to calculate their personal records.
- Who is it for? (Just you? Anyone who lifts?)

This application is for anyone that wants to track their progress and see how they progress over time. This would be
mainly used by people who want to track their fitness over time and want to keep themselves accountable and make change
in their lives.

## 2. Features (version 1)
List the 4–6 things a user can do. Example format:
- Log a body measurement (weight, neck, waist, hip)
- View measurement history
- Setup up a profile (height, sex)
- Able to calculate body fat percentage, Fat Free Mass Index
- Add a workout
- View workouts
- Remove a workout

## 3. Not in version 1
What are you deliberately leaving out for now? (login, charts, ML, ...)
- Machine Learning algorithm that would predict when they would reach a certain body fat percentage
- Login credentials
- Strength score
- Trend charts
- Personal records (prs)

## 4. Data model (tables)
For each table: its name, its columns, and what each column stores.
- Which table connects to which? (e.g., a workout has many sets)
- Which values are stored, and which are calculated
  (BMI, body fat %, FFMI)? Why?

For the tables that would store the data of the workouts and the exercises that were completed these would be stored in
2 separate tables
The first table would store the workout session, with the first column holding the id and the second column would store
the date.
The second table would store the exercises sets where each row would be a single set
The first column would be the id, second column the workout_id, third column being the exercises name, fourth column
being the set number, fifth column holding the number of reps, and the last column be the weight used.

For the tables that would store the data of the user these would be split into 2 further tables
The first table would store the body measure where each row is time you measured
The first column would be an id, the second column a date, the third column height, fourth column sex, fifth column neck
sixth column waist, and the seventh column being hip, eighth column body weight.

The second table would be the profile where the first column would be the name of the user, and the second column would
be age.

## 5. API endpoints
For each feature: the HTTP method, the URL, what goes in the
request body, and what comes back.
Example: POST /api/measurements → saves a measurement, returns it with status 201

For each feature depending on if the user is inputting data the method should be POST, the request body would hold the
information the user put in. And it would save the information it input and return with a status code of 201

POST /api/workouts → body: data, sets → returns the saved workout, 201
GET /api/workouts → return all workouts, 200
DELETE /api/workouts{id} → deletes one workout, 204 (or 404 if not found)
GET /api/

If the user is requesting information that is stored in the database the method would be GET.

## 6. Architecture diagram
A boxes-and-arrows drawing: React → Spring Boot → PostgreSQL.
(A photo of a hand drawing is fine.)

Browser: React --HTTP + JSON → Spring Boot --SQL → PostgreSQL


## 7. Open questions
Anything you're unsure about.

I am unsure about if I should include words of encouragement to keep the user motivated and engaged. I am also unsure if
I should include a dashboard recording how the week is going.