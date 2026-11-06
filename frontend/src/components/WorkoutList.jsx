import WorkoutCard from "./WorkoutCard.jsx";

export default function WorkoutList({ workouts, onDeleted }) {
    if (workouts.length === 0) {
        return <p>No workouts yet.</p>;
    }

    const sorted = [...workouts].sort((a, b) =>
        b.workoutDate.localeCompare(a.workoutDate)
    );

    return (
        <ul className="workout-list">
            {sorted.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} onDeleted={onDeleted} />
            ))}
        </ul>
    );
}
