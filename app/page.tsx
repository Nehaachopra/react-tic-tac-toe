import {GameContextProvider} from "./contexts/ticTacToe.context";
import Todo from "./components/Todo";

export default function Home() {
  return (
    <GameContextProvider>
      <Todo />
    </GameContextProvider>
  );
}
