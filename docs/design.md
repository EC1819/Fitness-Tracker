# Fitness Tracker – Design Doc

## 1. Overview
- What does the app do, in 2–3 sentences?

This app will allow users to track the exercises that they have done and have them neatly organized separated by day.
User would be able to input their bio information such as height, weight, gender, and calculate how strong they are
based on their groups. The application would show a trend chart showing users overtime how their strength has increased
over time and using a formula to calculate their personal records.
- Who is it for? (Just you? Anyone who lifts?)

This application is for anyone that wants to track their progress and see how they progress over time. This would be
mainly used by people who want to track their fitness over time and want to keep themselves accountable and make change
in their lives.

## 2. Features (version 1)
List the 4–6 things a user can do. Example format:
- Log a body measurement (weight, neck, waist, hip)
- Able to calculate body fat percentage, Fat Free Mass Index
- Add a workout
- View workouts
- Remove a workout

## 3. Not in version 1
What are you deliberately leaving out for now? (login, charts, ML, ...)
- Machine Learning algorithm that would predict when they would reach a certain body fat percentage
- Login credentials

## 4. Data model (tables)
For each table: its name, its columns, and what each column stores.
- Which table connects to which? (e.g., a workout has many sets)
- Which values are stored, and which are calculated
  (BMI, body fat %, FFMI)? Why?

For the first table it would store the exercises done: the first column would be the name of the exercise, the second
column being the number of sets done, third column being number of reps.

The second table would store and display the users bio information such the Body Fat % and FFMI.

The value that would be calculated but not shown to the user would be BMI since it's a misleading metric depending if
you have a lot of muscle on the body. Showing this number would only harm the user as it may lead to user being
discouraged from working out since they would believe they're wasting their efforts. Or it may hte user to work out
excessively which would put the user's body in more harm than benefiting from it.

## 5. API endpoints
For each feature: the HTTP method, the URL, what goes in the
request body, and what comes back.
Example: POST /api/measurements → saves a measurement, returns it with status 201

For each feature depending on if the user is inputting data the method should be POST, the request body would hold the
information the user put in. And it would save the information it input and return with a status code is 200

If the user is requesting information that is stored in the database the method would be GET.

## 6. Architecture diagram
A boxes-and-arrows drawing: React → Spring Boot → PostgreSQL.
(A photo of a hand drawing is fine.)

App logic -> Cloud/Database


## 7. Open questions
Anything you're unsure about.

I am unsure about if I should include words of encouragement to keep the user motivated and engaged. I am also unsure if
I should include a dashboard recording how the week is going.