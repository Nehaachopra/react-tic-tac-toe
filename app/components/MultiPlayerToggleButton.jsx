

import {useGameContext} from "../contexts/ticTacToe.context";

export default function MultiPlayerToggleButton() {
  const { isMultiPlayer, setIsMultiPlayer, resetPlayers, resetSquares } = useGameContext();

  return (
  <div className="flex items-center justify-center">
    <button
      onClick={() => {
        // reset board and players before switching mode
        resetPlayers();
        resetSquares();
        setIsMultiPlayer(!isMultiPlayer);
      }}
      className={`
        relative
        flex
        items-center
        w-72
        p-1
        rounded-2xl
        bg-zinc-900
        border
        border-zinc-800
        shadow-xl
        transition-all
        duration-300
      `}
    >
      {/* Sliding Background */}
      <div
        className={`
          absolute
          top-1
          bottom-1
          w-[calc(50%-4px)]
          rounded-xl
          bg-zinc-700
          transition-all
          duration-300
          ${
            isMultiPlayer
              ? "translate-x-full"
              : "translate-x-0"
          }
        `}
      />

      {/* Single Player */}
      <div
        className={`
          relative
          z-10
          flex-1
          py-3
          text-center
          font-semibold
          rounded-xl
          transition-colors
          duration-300
          ${
            !isMultiPlayer
              ? "text-white"
              : "text-zinc-400"
          }
        `}
      >
        Single Player
      </div>

      {/* Multi Player */}
      <div
        className={`
          relative
          z-10
          flex-1
          py-3
          text-center
          font-semibold
          rounded-xl
          transition-colors
          duration-300
          ${
            isMultiPlayer
              ? "text-white"
              : "text-zinc-400"
          }
        `}
      >
        Multi Player
      </div>
    </button>
  </div>
);
}