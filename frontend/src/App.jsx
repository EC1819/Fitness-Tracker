import { useEffect, useState } from "react";
import { API_URL } from "./api";
import { describeFetchError } from "./errorMessages";
import HomeScreen from "./screens/HomeScreen.jsx";
import BodyScreen from "./screens/BodyScreen.jsx";
import WorkoutsScreen from "./screens/WorkoutsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import BottomNav from "./components/BottomNav.jsx";

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

  if (profileStatus === "loading") {
    return (
        <main>
          <h1>Fitness Tracker</h1>
          <p>Loading...</p>
        </main>
    );
  }

  if (profileStatus === "error") {
    return (
        <main>
          <h1>Fitness Tracker</h1>
          <p>Error: {profileErrorMsg}</p>
        </main>
    );
  }

  if (profileStatus === "missing" && !isOnboarding) {
    return (
        <main>
          <h1>Fitness Tracker</h1>
          <WelcomeScreen onGetStarted={() => setIsOnboarding(true)} />
        </main>
    );
  }

  if (profileStatus === "missing" && isOnboarding) {
    return (
        <main>
          <h1>Fitness Tracker</h1>
          <ProfileScreen onSaved={handleProfileSaved} />
        </main>
    );
  }

  const ActiveScreen = SCREENS[activeTab];

  return (
      <main>
        <h1>Fitness Tracker</h1>
        <ActiveScreen />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
  );
}
