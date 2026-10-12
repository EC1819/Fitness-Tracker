# Fitness Tracker – Design Doc

## 1. Overview
- What does the app do, in 2–3 sentences?

This app will allow users to track the exercises that they have done and have them neatly organized separated by day.
User would be able to input their bio information such as height, weight, gender. Users would be able to calculate their
Body Fat % and FFMI.

Long term goal:
- calculate how strong users are based on their demographic percentiles and muscle group & global aggregation.
- The application would show a trend chart showing users overtime how their strength has increased over time and using a formula to calculate their personal records.
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
Workouts Table: 
- The first table would store the workout session, with the first column holding the id
- Second column would store the date of the session.

Exercise-Sets Table:
The second table would store the exercises sets where each row would be a single set
- The first column would be the id
- Second column the workout_id
- Third column being the exercises name
- Fourth column being the set number
- Fifth column holding the number of reps
- Sixth column be the weight_lbs used

For the tables that would store the data of the user these would be split into 2 further tables

Body Measurements table :
- First column would be an id
- Second column a date
- Third column being body weight_lbs
- Fourth column neck_in
- Fifth column waist_in
- Sixth column being hip_in

Profile table : 
The second table would be the profile
- First would include an id
- Second column would be height_in
- Third column would be sex(male/female).

The values that would be calculated Body fat % and FFMI from the stored measurements, but these values would not be
stored.

BMI is used internally but not shown to the user since it's a misleading metric depending if you have a lot of muscle on
the body. Showing this number would only harm the user as it may lead to user being discouraged from working out since
they would believe they're wasting their efforts. Or it may hte user to work out excessively which would put the user's
body in more harm than benefiting from it.

## 5. API endpoints
For each feature: the HTTP method, the URL, what goes in the
request body, and what comes back.
Example: POST /api/measurements → saves a measurement, returns it with status 201

For each feature depending on if the user is inputting data the method should be POST, the request body would hold the
information the user put in. And it would save the information it input and return with a status code of 201

POST /api/workouts → body: date, sets → returns the saved workout, return with status 201
GET /api/workouts → return all workouts, return with status 200
DELETE /api/workouts/{id} → deletes one workout, return with status 204 (or 404 if not found)
GET /api/workouts/{id} → view one workout, return with status 200 or return 404 if not found
POST /api/measurements → body: measurement, returns with status 201
GET /api/measurements →  return all measurements, return with status 200
GET /api/metrics 
GET /api/profile → return profile details, return with status code 200
PUT /api/profile → body: date, height_in, sex(male/female), return with status code 200


If the user is requesting information that is stored in the database the method would be GET.

## 6. Architecture diagram
A boxes-and-arrows drawing: React → Spring Boot → PostgreSQL.
(A photo of a hand drawing is fine.)
```
[ Browser: React ]  --HTTP request + JSON→  [ Spring Boot ]  --SQL→  [ PostgreSQL ]
                    ←HTTP response + JSON--                  ←rows--
```


## 7. Open questions
Anything you're unsure about.

I am unsure about if I should include words of encouragement to keep the user motivated and engaged. I am also unsure if
I should include a dashboard recording how the week is going.