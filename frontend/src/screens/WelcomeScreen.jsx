export default function WelcomeScreen({ onGetStarted }) {
    return (
        <section>
            <h2>Welcome to Fitness Tracker</h2>
            <p>Let's set up your profile to get started.</p>
            <button type="button" onClick={onGetStarted}>
                Get started
            </button>
        </section>
    );
}
