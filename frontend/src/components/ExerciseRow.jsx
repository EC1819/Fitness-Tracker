export default function ExerciseRow({ row, onChange, onRemove }) {
    return (
        <fieldset className="exercise-row">
            <label>
                Exercise
                <input
                    type="text"
                    value={row.exerciseName}
                    onChange={(e) => onChange("exerciseName", e.target.value)}
                />
            </label>
            <label>
                Sets
                <input
                    type="number"
                    min="1"
                    value={row.setsCount}
                    onChange={(e) => onChange("setsCount", e.target.value)}
                />
            </label>
            <label>
                Reps
                <input
                    type="number"
                    min="1"
                    value={row.reps}
                    onChange={(e) => onChange("reps", e.target.value)}
                />
            </label>
            <label>
                Weight (lbs)
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={row.weightLbs}
                    onChange={(e) => onChange("weightLbs", e.target.value)}
                />
            </label>
            <button type="button" onClick={onRemove}>
                Remove
            </button>
        </fieldset>
    );
}
