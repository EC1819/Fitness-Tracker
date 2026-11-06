import { useState } from "react";
import { API_URL } from "../api";
import { formatFieldErrors, describeFetchError } from "../errorMessages";
import { requiredError, positiveError } from "../formValidation";
import ErrorMessage from "./ErrorMessage.jsx";
import ExerciseRow from "./ExerciseRow.jsx";

const LABELS = {
    workoutDate: "Date",
    sets: { _self: "Exercises" },
};

const ROW_LABELS = {
    exerciseName: "Exercise name",
    setsCount: "Number of sets",
    reps: "Reps",
    weightLbs: "Weight",
};

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

function validateTopLevel(workoutDate, rows) {
    const errors = {};
    const dateError = requiredError(workoutDate);
    if (dateError) errors.workoutDate = dateError;
    if (rows.length === 0) errors.sets = "must not be empty";
    return errors;
}

function validateRows(rows) {
    const messages = [];

    rows.forEach((row, index) => {
        const prefix = `Exercise ${index + 1}:`;

        const nameError = requiredError(row.exerciseName.trim());
        if (nameError) messages.push(`${prefix} ${ROW_LABELS.exerciseName} ${nameError}.`);

        const setsError = requiredError(row.setsCount) ?? positiveError(row.setsCount);
        if (setsError) messages.push(`${prefix} ${ROW_LABELS.setsCount} ${setsError}.`);

        const repsError = requiredError(row.reps) ?? positiveError(row.reps);
        if (repsError) messages.push(`${prefix} ${ROW_LABELS.reps} ${repsError}.`);

        const weightError =
            requiredError(row.weightLbs) ?? positiveError(row.weightLbs, { allowZero: true });
        if (weightError) messages.push(`${prefix} ${ROW_LABELS.weightLbs} ${weightError}.`);
    });

    return messages;
}

export default function WorkoutForm({ onSaved, onCancel }) {
    const [workoutDate, setWorkoutDate] = useState(today());
    const [notes, setNotes] = useState("");
    const [rows, setRows] = useState([newRow()]);
    const [formErrors, setFormErrors] = useState([]);

    function updateRow(id, field, value) {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
        setFormErrors([]);
    }

    function addRow() {
        setRows((prev) => [...prev, newRow()]);
    }

    function removeRow(id) {
        setRows((prev) => prev.filter((row) => row.id !== id));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const topLevelErrors = formatFieldErrors(
            validateTopLevel(workoutDate, rows),
            LABELS
        );
        const rowErrors = rows.length === 0 ? [] : validateRows(rows);
        const clientErrors = [...topLevelErrors, ...rowErrors];
        if (clientErrors.length > 0) {
            setFormErrors(clientErrors);
            return;
        }

        setFormErrors([]);

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
                    return res
                        .json()
                        .then((errors) => setFormErrors(formatFieldErrors(errors, LABELS)));
                }
                setFormErrors([`Server error: ${res.status}`]);
            })
            .catch((err) => setFormErrors([describeFetchError(err)]));
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label>
                Date *
                <input
                    type="date"
                    value={workoutDate}
                    onChange={(e) => {
                        setWorkoutDate(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <label>
                Notes
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => {
                        setNotes(e.target.value);
                        setFormErrors([]);
                    }}
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
            <p className="form-note">* Required</p>
            <div className="form-actions">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary">
                    Save
                </button>
            </div>

            <ErrorMessage messages={formErrors} />
        </form>
    );
}
