import { useEffect, useState} from "react";
import {API_URL} from "../api";

export default function ProfileScreen({ onSaved }) {
    const [heightIn, setHeightIn] = useState("");
    const [sex, setSex] = useState("MALE");
    const [message, setMessage] = useState("");

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
            .catch((err) => setMessage(err.message));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${API_URL}/api/profile`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ heightIn: Number(heightIn), sex}),
        })
            .then((res) => {
                if (res.status === 400) throw new Error("Please enter a valid height.");
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then(() => {
                setMessage("Profile saved.");
                if (onSaved) onSaved();
            })
            .catch((err) => setMessage(err.message));
    }

    return (
        <section>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Height (inches)
                    <input
                        type="number"
                        step="0.1"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        />
                </label>
                <label>
                    Sex
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </label>
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </section>
    );
}
