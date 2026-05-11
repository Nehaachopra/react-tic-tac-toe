import {useGameContext} from "../contexts/ticTacToe.context"
import type {PlayersObj, SquareObj} from "../contexts/ticTacToe.context.jsx"

 const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

function findBestMove(
  board: SquareObj[],
  symbol: "x" | "o"
) {
  for (const pattern of WINNING_PATTERNS) {
    const values = pattern.map(
      (index) => board[index].state
    );

    const matching = values.filter(
      (value) => value === symbol
    ).length;

    const emptyIndex = values.findIndex(
      (value) => value === ""
    );

    if (matching === 2 && emptyIndex !== -1) {
      return pattern[emptyIndex];
    }
  }

  return null;
}

export default function Squares() {
  const {currentPlayer, setPlayers, setCurrentPlayer, isMultiPlayer, setWinner, squares, setSquares, resetSquares} = useGameContext();

  function handleSquare(index: number) {
    if (squares[index].state !== "") return;
    const state = currentPlayer === 0 ? "x" : "o";
    const updated: SquareObj[] = [...squares];
     updated[index] = {
      ...updated[index],
      state,
    };
    setSquares(updated);

    const places: number[] = [];
    updated.forEach(one => one.state === state && places.push(one.id));

    const hasWon = WINNING_PATTERNS.some((pattern) =>
      pattern.every((position) =>
        places.includes(position)
      )
    );
    if (hasWon) {
    setPlayers((prev: PlayersObj[]) => prev.map((person) => {
      if (person.id === currentPlayer) {
        setWinner(person);
        return {...person, score:person.score++};
      }
      else {
        return person;
      } 
    }));
    resetSquares();
    setCurrentPlayer(0);
    return;
    }
    setCurrentPlayer((prev: number) => prev === 0 ? 1 : 0);
    if (!isMultiPlayer) {
      const computerState = state === "x" ? "o" : "x";
      let winningMove = false;

        // 1. Try winning
      let move = findBestMove(updated, computerState);

      // 2. Try blocking player
      if (move === null) {
        move = findBestMove(updated, state);
      }

      else {
        winningMove = true;
      }

      // 3. Take center
      if (move === null && updated[4].state === "") {
        move = 4;
      }

      // 4. Random move
      if (move === null) {
        const empty = updated.filter(
          (square) => square.state === ""
        );

        const random =
          empty[Math.floor(Math.random() * empty.length)];

        move = random.id;
      }

      updated[move].state = computerState;
      setSquares([...updated]);
      if (winningMove) {
        setPlayers((prev: PlayersObj[]) => prev.map((person) => {
          if (person.prop === computerState) {
            setWinner(person);
            return {...person, score:person.score++}
          }
          else {
            return person
          }
        }));
        resetSquares();
        setCurrentPlayer(0);
      }
      else {
        setCurrentPlayer((prev: number) => prev === 0 ? 1 : 0);
      }
    }
  }

  return (
    <div className="flex items-center justify-center bg-zinc-950 p-6 mt-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6">
        <div className="grid grid-cols-3 gap-3">
          {squares.map((square, index) => {
            return (
              <button
                key={square.id}
                onClick={() => handleSquare(index)}
                className="
                  w-24 h-24
                  md:w-28 md:h-28
                  rounded-2xl
                  bg-zinc-800
                  hover:bg-zinc-700
                  active:scale-95
                  transition-all
                  duration-200
                  text-4xl
                  md:text-5xl
                  font-black
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  border
                  border-zinc-700
                "
              >
                <span
                  className={
                    square.state === "x"
                      ? "text-blue-400"
                      : square.state === "o"
                      ? "text-pink-400"
                      : "text-zinc-700"
                  }
                >
                  {square.state.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}