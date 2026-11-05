import { useState } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import BodyScreen from "./screens/BodyScreen.jsx";
import WorkoutsScreen from "./screens/WorkoutsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import BottomNav from "./components/BottomNav.jsx";

const SCREENS = {
  home: HomeScreen,
  body: BodyScreen,
  workouts: WorkoutsScreen,
  profile: ProfileScreen,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const ActiveScreen = SCREENS[activeTab];

  return (
      <main>
        <h1>Fitness Tracker</h1>
        <ActiveScreen />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </main>
  );
}
