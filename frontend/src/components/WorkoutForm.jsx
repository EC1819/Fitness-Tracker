import { useState } from "react";
import { API_URL } from "../api";
import ExerciseRow from "./ExerciseRow.jsx";

function today() {
    return new Date().toISOString().slice(0, 10);
}

function newRow() {
    return {
        id: crypto.randomUUID(),
        exerciseName: "",
        setsCount: "1",
        reps: "",
        weightLbs: "",
    };
}

function rowsToSets(rows) {
    const sets = [];
    for (const row of rows) {
        const setsCount = Number(row.setsCount);
        for (let setNumber = 1; setNumber <= setsCount; setNumber++) {
            sets.push({
                exerciseName: row.exerciseName,
                setNumber,
                reps: Number(row.reps),
                weightLbs: Number(row.weightLbs),
            });
        }
    }
    return sets;
}

export default function WorkoutForm({ onSaved }) {
    const [workoutDate, setWorkoutDate] = useState(today());
    const [notes, setNotes] = useState("");
    const [rows, setRows] = useState([newRow()]);
    const [fieldErrors, setFieldErrors] = useState(null);

    function updateRow(id, field, value) {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    }

    function addRow() {
        setRows((prev) => [...prev, newRow()]);
    }

    function removeRow(id) {
        setRows((prev) => prev.filter((row) => row.id !== id));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setFieldErrors(null);

        fetch(`${API_URL}/api/workouts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                workoutDate,
                notes: notes === "" ? null : notes,
                sets: rowsToSets(rows),
            }),
        })
            .then((res) => {
                if (res.status === 201) {
                    onSaved();
                    return;
                }
                if (res.status === 400) {
                    return res.json().then((errors) => setFieldErrors(errors));
                }
                setFieldErrors({ error: `Server error: ${res.status}` });
            })
            .catch((err) => setFieldErrors({ error: err.message }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date
                <input
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                />
            </label>
            <label>
                Notes (optional)
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </label>

            {rows.map((row) => (
                <ExerciseRow
                    key={row.id}
                    row={row}
                    onChange={(field, value) => updateRow(row.id, field, value)}
                    onRemove={() => removeRow(row.id)}
                />
            ))}

            <button type="button" onClick={addRow}>
                Add exercise
            </button>
            <button type="submit">Save</button>

            {fieldErrors && (
                <ul className="form-errors">
                    {Object.entries(fieldErrors).map(([field, message]) => (
                        <li key={field}>
                            {field}: {message}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}
