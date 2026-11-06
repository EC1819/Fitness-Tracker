import { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./api";
import { describeFetchError } from "./errorMessages";
import HomeScreen from "./screens/HomeScreen.jsx";
import BodyScreen from "./screens/BodyScreen.jsx";
import WorkoutsScreen from "./screens/WorkoutsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import BottomNav from "./components/BottomNav.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const SCREENS = {
  home: HomeScreen,
  body: BodyScreen,
  workouts: WorkoutsScreen,
  profile: ProfileScreen,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [profileStatus, setProfileStatus] = useState("loading");
  const [profileErrorMsg, setProfileErrorMsg] = useState("");
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/profile`)
        .then((res) => {
          if (res.status === 404) return null;
          if (!res.ok) throw new Error(`Server error: ${res.status}`);
          return res.json();
        })
        .then((profile) => {
          setProfileStatus(profile ? "exists" : "missing");
        })
        .catch((err) => {
          setProfileErrorMsg(describeFetchError(err));
          setProfileStatus("error");
        });
  }, []);

  function handleProfileSaved() {
    setProfileStatus("exists");
    setIsOnboarding(false);
    setActiveTab("home");
  }

  let content;
  let showNav = false;

  if (profileStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (profileStatus === "error") {
    content = <p className="error-banner">{profileErrorMsg}</p>;
  } else if (profileStatus === "missing" && !isOnboarding) {
    content = <WelcomeScreen onGetStarted={() => setIsOnboarding(true)} />;
  } else if (profileStatus === "missing" && isOnboarding) {
    content = <ProfileScreen onSaved={handleProfileSaved} />;
  } else {
    const ActiveScreen = SCREENS[activeTab];
    content = <ActiveScreen />;
    showNav = true;
  }

  return (
      <main>
        <header>
          <h1>Fitness Tracker</h1>
          <ThemeToggle />
        </header>
        {content}
        {showNav && (
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </main>
  );
}
