import { formatFriendlyDate } from "../dateUtils";

function uniqueExerciseNames(sets) {
    const names = [];
    for (const set of sets) {
        if (!names.includes(set.exerciseName)) {
            names.push(set.exerciseName);
        }
    }
    return names;
}

export default function WeekWorkoutsCard({ workouts }) {
    if (workouts.length === 0) {
        return (
            <div className="week-workouts-card">
                <h3>This Week</h3>
                <p>No workouts logged this week yet.</p>
            </div>
        );
    }

    const sorted = [...workouts].sort((a, b) =>
        b.workoutDate.localeCompare(a.workoutDate)
    );

    return (
        <div className="week-workouts-card">
            <h3>This Week</h3>
            <ul>
                {sorted.map((workout) => (
                    <li key={workout.id}>
                        {formatFriendlyDate(workout.workoutDate, { includeYear: false })} —{" "}
                        {uniqueExerciseNames(workout.sets).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}
