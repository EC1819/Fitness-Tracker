const TABS = [
    { key: "home", label: "Home" },
    { key: "body", label: "Body" },
    { key: "workouts", label: "Workouts" },
    { key: "profile", label: "Profile" },
];

export default function BottomNav({ activeTab, onTabChange }) {
    return (
        <nav className="bottom-nav">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={tab.key === activeTab ? "active" : ""}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
