import {GameContextProvider} from "./contexts/ticTacToe.context";
import Todo from "./components/Todo";

export default function Home() {
  return (
    // wrap todo in the context provier to be able to access values using useGameContext!
    <GameContextProvider>
      <Todo />
    </GameContextProvider>
  );
}
