import GameScreen from "./components/screens/GameScreen";
import SetupScreen from "./components/screens/SetupScreen";
import VictoryScreen from "./components/screens/VictoryScreen";
import { useGameStore } from "./store";

function App() {
  const phase = useGameStore((state) => state.phase);

  if (phase === "playing") {
    return <GameScreen />;
  }

  if (phase === "finished") {
    return <VictoryScreen />;
  }

  return <SetupScreen />;
}

export default App;
