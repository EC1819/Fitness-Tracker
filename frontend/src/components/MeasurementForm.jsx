import { useState } from "react";
import { API_URL } from "../api";
import { formatFieldErrors, describeFetchError } from "../errorMessages";
import { requiredError, positiveError } from "../formValidation";
import ErrorMessage from "./ErrorMessage.jsx";

const LABELS = {
    measurementDate: "Date",
    bodyWeightLbs: "Weight",
    neckIn: "Neck",
    waistIn: "Waist",
    hipIn: "Hip",
};

function today() {
    return new Date().toISOString().slice(0, 10);
}

function validate({ measurementDate, bodyWeightLbs, neckIn, waistIn, hipIn }) {
    const errors = {};

    const dateError = requiredError(measurementDate);
    if (dateError) errors.measurementDate = dateError;

    const weightError = requiredError(bodyWeightLbs) ?? positiveError(bodyWeightLbs);
    if (weightError) errors.bodyWeightLbs = weightError;

    const neckError = requiredError(neckIn) ?? positiveError(neckIn);
    if (neckError) errors.neckIn = neckError;

    const waistError = requiredError(waistIn) ?? positiveError(waistIn);
    if (waistError) errors.waistIn = waistError;

    if (hipIn !== "") {
        const hipError = positiveError(hipIn);
        if (hipError) errors.hipIn = hipError;
    }

    return errors;
}

export default function MeasurementForm({ onSaved }) {
    const [measurementDate, setMeasurementDate] = useState(today());
    const [bodyWeightLbs, setBodyWeightLbs] = useState("");
    const [neckIn, setNeckIn] = useState("");
    const [waistIn, setWaistIn] = useState("");
    const [hipIn, setHipIn] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();

        const clientErrors = validate({
            measurementDate,
            bodyWeightLbs,
            neckIn,
            waistIn,
            hipIn,
        });
        if (Object.keys(clientErrors).length > 0) {
            setFormErrors(formatFieldErrors(clientErrors, LABELS));
            return;
        }

        setFormErrors([]);

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
                    value={measurementDate}
                    onChange={(e) => {
                        setMeasurementDate(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <label>
                Weight (lbs) *
                <input
                    type="number"
                    step="0.1"
                    value={bodyWeightLbs}
                    onChange={(e) => {
                        setBodyWeightLbs(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <label>
                Neck (in) *
                <input
                    type="number"
                    step="0.1"
                    value={neckIn}
                    onChange={(e) => {
                        setNeckIn(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <label>
                Waist (in) *
                <input
                    type="number"
                    step="0.1"
                    value={waistIn}
                    onChange={(e) => {
                        setWaistIn(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <label>
                Hip (in)
                <input
                    type="number"
                    step="0.1"
                    value={hipIn}
                    onChange={(e) => {
                        setHipIn(e.target.value);
                        setFormErrors([]);
                    }}
                />
            </label>
            <p className="form-note">* Required</p>
            <button type="submit">Save</button>
            <ErrorMessage messages={formErrors} />
        </form>
    );
}
