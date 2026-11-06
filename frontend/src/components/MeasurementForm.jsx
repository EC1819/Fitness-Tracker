import { useState } from "react";
import { API_URL } from "../api";

function today() {
    return new Date().toISOString().slice(0, 10);
}

export default function MeasurementForm({ onSaved }) {
    const [measurementDate, setMeasurementDate] = useState(today());
    const [bodyWeightLbs, setBodyWeightLbs] = useState("");
    const [neckIn, setNeckIn] = useState("");
    const [waistIn, setWaistIn] = useState("");
    const [hipIn, setHipIn] = useState("");
    const [fieldErrors, setFieldErrors] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        setFieldErrors(null);

        fetch(`${API_URL}/api/measurements`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                measurementDate,
                bodyWeightLbs: Number(bodyWeightLbs),
                neckIn: Number(neckIn),
                waistIn: Number(waistIn),
                hipIn: hipIn === "" ? null : Number(hipIn),
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
                    value={measurementDate}
                    onChange={(e) => setMeasurementDate(e.target.value)}
                />
            </label>
            <label>
                Weight (lbs)
                <input
                    type="number"
                    step="0.1"
                    value={bodyWeightLbs}
                    onChange={(e) => setBodyWeightLbs(e.target.value)}
                />
            </label>
            <label>
                Neck (in)
                <input
                    type="number"
                    step="0.1"
                    value={neckIn}
                    onChange={(e) => setNeckIn(e.target.value)}
                />
            </label>
            <label>
                Waist (in)
                <input
                    type="number"
                    step="0.1"
                    value={waistIn}
                    onChange={(e) => setWaistIn(e.target.value)}
                />
            </label>
            <label>
                Hip (in, optional)
                <input
                    type="number"
                    step="0.1"
                    value={hipIn}
                    onChange={(e) => setHipIn(e.target.value)}
                />
            </label>
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
