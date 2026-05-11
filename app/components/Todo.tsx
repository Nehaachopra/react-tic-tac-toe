"use client";

import { useEffect } from "react";
import Squares from "./Squares";
import MultiPlayerToggleButton from "./MultiPlayerToggleButton";
import { useGameContext } from "../contexts/ticTacToe.context";
export default function Todo() {
  const { players, winner, setWinner, currentPlayer, isMultiPlayer } = useGameContext();

  // after 3.5 seconds, reset winner to null!
  useEffect(() => {
    if (!winner) return;

    const timer = setTimeout(() => {
      setWinner(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [winner, setWinner]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-8 p-6 relative overflow-hidden">
      {" "}
      {/* Winner Celebration */}{" "}
      {winner && (
        <>
          {" "}
          {/* Backdrop */}{" "}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-300" />{" "}
          {/* Floating Glow */}{" "}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            {" "}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />{" "}
            {/* Celebration Card */}{" "}
            <div className="relative bg-zinc-900 border border-zinc-700 rounded-[2rem] p-12 shadow-2xl flex flex-col items-center animate-in zoom-in-50 duration-500">
              {" "}
              {/* Trophy */}{" "}
              <div className="text-8xl mb-4 animate-bounce"> 🏆 </div>{" "}
              <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-3">
                {" "}
                Winner{" "}
              </p>{" "}
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-pink-400 text-transparent bg-clip-text">
                {" "}
                {isMultiPlayer 
                  ? `Player ${winner.id}`
                  : winner.id === 1 
                  ? `Computer` 
                  : `Player ${winner.id}`
                }
              </h1>{" "}
              <div
                className={`                mt-4                text-8xl                font-black                ${winner.prop === "x" ? "text-blue-400" : "text-pink-400"}              `}
              >
                {" "}
                {winner.prop.toUpperCase()}{" "}
              </div>{" "}
              <p className="mt-6 text-zinc-400 text-lg">
                {" "}
                Dominated the board.{" "}
              </p>{" "}
              {/* Decorative Particles */}{" "}
              <div className="absolute -top-5 -left-5 text-4xl animate-ping">
                {" "}
                ✨{" "}
              </div>{" "}
              <div className="absolute -bottom-4 -right-4 text-4xl animate-ping delay-300">
                {" "}
                🎉{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </>
      )}{" "}
      <MultiPlayerToggleButton /> {/* Players */}{" "}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {players.map((player) => {
          const isActive = currentPlayer === player.id;
          return (
            <div
              key={player.id}
              className={`              relative              overflow-hidden              rounded-3xl              border              p-6              transition-all              duration-300              shadow-xl              ${isActive ? "border-blue-500 bg-zinc-900 scale-[1.02]" : "border-zinc-800 bg-zinc-900/70"}            `}
            >
              {" "}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
              )}{" "}
              <div className="flex items-center justify-between mb-5">
                {" "}
                <div>
                  {" "}
                  <h3
                    className={`                    text-2xl                    font-black                    tracking-tight                    ${isActive ? "text-blue-400" : "text-zinc-300"}                  `}
                  >
                    {" "}
                    {isMultiPlayer 
                      ? `Player ${player.id}` 
                      : player.id === 1
                      ? `Computer`
                      : `Player ${player.id}`
                    }
                  </h3>{" "}
                </div>{" "}
                <div
                  className={`                  w-4                  h-4                  rounded-full                  ${isActive ? "bg-green-400 shadow-lg shadow-green-500/40" : "bg-zinc-700"}                `}
                />{" "}
              </div>{" "}
              <div className="flex items-end justify-between">
                {" "}
                <div>
                  {" "}
                  <p className="text-zinc-500 text-sm uppercase tracking-wide">
                    {" "}
                    Score{" "}
                  </p>{" "}
                  <h2 className="text-4xl font-black mt-1">
                    {" "}
                    {player.score}{" "}
                  </h2>{" "}
                </div>{" "}
                <div
                  className={`                  text-4xl                  font-black                  opacity-20                  ${player.prop === "x" ? "text-blue-400" : "text-pink-400"}                `}
                >
                  {" "}
                  {player.prop.toUpperCase()}{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
      <Squares />{" "}
    </div>
  );
  
}
