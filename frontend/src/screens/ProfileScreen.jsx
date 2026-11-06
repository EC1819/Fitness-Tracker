import { useEffect, useState} from "react";
import {API_URL} from "../api";
import { formatFieldErrors, describeFetchError } from "../errorMessages";
import { requiredError, positiveError } from "../formValidation";
import ErrorMessage from "../components/ErrorMessage.jsx";

const LABELS = {
    heightIn: "Height",
    sex: "Sex",
};

function validate({ heightIn, sex }) {
    const errors = {};

    const heightError = requiredError(heightIn) ?? positiveError(heightIn);
    if (heightError) errors.heightIn = heightError;

    const sexError = requiredError(sex);
    if (sexError) errors.sex = sexError;

    return errors;
}

export default function ProfileScreen({ onSaved }) {
    const [heightIn, setHeightIn] = useState("");
    const [sex, setSex] = useState("MALE");
    const [message, setMessage] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/profile`)
            .then((res) => {
                if (res.status === 404) return null;
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((profile) => {
                if (profile) {
                    setHeightIn(profile.heightIn);
                    setSex(profile.sex);
                } else {
                    setMessage("No profile yet. Enter your height and sex.");
                }
            })
            .catch((err) => setMessage(describeFetchError(err)));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const clientErrors = validate({ heightIn, sex });
        if (Object.keys(clientErrors).length > 0) {
            setFormErrors(formatFieldErrors(clientErrors, LABELS));
            return;
        }

        setFormErrors([]);
        setMessage("");

        fetch(`${API_URL}/api/profile`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ heightIn: Number(heightIn), sex}),
        })
            .then((res) => {
                if (res.status === 400) {
                    return res.json().then((errors) => {
                        setFormErrors(formatFieldErrors(errors, LABELS));
                    });
                }
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json().then(() => {
                    setMessage("Profile saved.");
                    if (onSaved) onSaved();
                });
            })
            .catch((err) => setMessage(describeFetchError(err)));
    }

    return (
        <section>
            <div className="card">
                <h2>Profile</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label>
                        Height (inches) *
                        <input
                            type="number"
                            step="0.1"
                            value={heightIn}
                            onChange={(e) => {
                                setHeightIn(e.target.value);
                                setFormErrors([]);
                            }}
                            />
                    </label>
                    <label>
                        Sex *
                        <select
                            value={sex}
                            onChange={(e) => {
                                setSex(e.target.value);
                                setFormErrors([]);
                            }}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </label>
                    <p className="form-note">* Required</p>
                    <button type="submit">Save</button>
                </form>
                {message && <p>{message}</p>}
                <ErrorMessage messages={formErrors} />
            </div>
        </section>
    );
}
