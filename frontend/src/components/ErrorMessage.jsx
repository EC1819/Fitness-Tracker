export default function ErrorMessage({ messages }) {
    if (!messages || messages.length === 0) return null;

    return (
        <ul className="error-banner">
            {messages.map((message) => (
                <li key={message}>{message}</li>
            ))}
        </ul>
    );
}
