"use client";
import {createContext, useContext, useState, Dispatch, SetStateAction, ReactNode} from "react";

export interface PlayersObj {
  id: number,
  prop: "x" | "o",
  score: number
}

export interface SquareObj {
  id: number
  state: '' | 'x' | 'o'
}

interface GameContextType {
  isMultiPlayer: boolean;
  setIsMultiPlayer: Dispatch<SetStateAction<boolean>>;

  players: PlayersObj[];
  setPlayers: Dispatch<SetStateAction<PlayersObj[]>>;

  currentPlayer: number;
  setCurrentPlayer: Dispatch<SetStateAction<number>>;

  winner: PlayersObj | null;
  setWinner: Dispatch<SetStateAction<PlayersObj | null>>;

  squares: SquareObj[] | null;
  setSquares: Dispatch<SetStateAction<SquareObj[] | null>>;

  resetPlayers: () => void;
  resetSquares: () => void;
}

interface GameContextProviderProps {
  children: ReactNode;
}

const createSquares = (): SquareObj[] => {
  return Array.from({ length: 9 }, (_, index) => ({
    id: index,
    state: "",
  }));
};

const createPlayers = (): PlayersObj[] => {
    return Array.from({ length: 2 }, (_, index) => ({
      id: index,
      prop: index === 0 ? "x" : "o",
      score: 0,
    }));
  };

const GameContext = createContext<GameContextType | null>(null);

export function GameContextProvider ({children}: GameContextProviderProps) {
  const [isMultiPlayer, setIsMultiPlayer] = useState<boolean>(false);
  const [squares, setSquares] = useState<SquareObj[]>(createSquares());
  const [players, setPlayers] = useState<PlayersObj[]>(createPlayers());
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [winner, setWinner] = useState<PlayersObj | null>(null)

  function resetSquares() {
    setSquares(createSquares());
  }

  function resetPlayers() {
    setPlayers(createPlayers())
  }

  return (
    <GameContext.Provider value={{isMultiPlayer, setIsMultiPlayer, players, setPlayers, resetPlayers, currentPlayer, setCurrentPlayer, winner, setWinner, squares, setSquares, resetSquares}}>
    {children}
  </GameContext.Provider>
);

}

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGameContext must be used inside GameContextProvider"
    );
  }

  return context;
};