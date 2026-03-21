"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNextPuzzle, resetProgress, setProgressTo } from "./lib/progress";

export default function StartPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/puzzles/1");
  const [gotoPuzzle, setGotoPuzzle] = useState("");
  const [force, setForce] = useState(false);

  useEffect(() => {
    setNextPath(getNextPuzzle());
  }, []);

  const handleReset = () => {
    resetProgress();
    setNextPath("/puzzles/1");
  };

  const handleGoToPuzzle = () => {
    const num = parseInt(gotoPuzzle);
    if (isNaN(num) || num < 1) return;
    if (force) {
      setProgressTo(num); // Mark all puzzles up to this number as completed
    }
    router.push(`/puzzles/${num}`);
  };

  return (
    <main className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">🌑 Into The Darkness</h1>
      <p className="text-gray-400 mb-10">Find what is hidden in the dark...</p>

      {/* Normal start/continue button */}
      <Link
        href={nextPath}
        className="bg-white text-black px-8 py-4 rounded-xl text-xl hover:bg-gray-200 transition"
      >
        {nextPath === "/puzzles/1"
          ? "🔦 St"
          : nextPath === "/reveal"
          ? "🌟 Reveal"
          : "🔦 Continue"}
      </Link>

      {/* Dev tools */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-gray-900 p-4 rounded-lg border border-gray-700 z-50">
          <h3 className="text-lg font-bold mb-2">⚙️ Dev Tools</h3>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="9"
                value={gotoPuzzle}
                onChange={(e) => setGotoPuzzle(e.target.value)}
                placeholder="Puzzle #"
                className="bg-black border border-gray-700 p-2 rounded w-24 text-white"
              />
              <button
                onClick={handleGoToPuzzle}
                className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400"
              >
                Go
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={force}
                onChange={(e) => setForce(e.target.checked)}
              />
              Force unlock (marks previous puzzles as completed)
            </label>
          </div>
          <button
            onClick={handleReset}
            className="mt-2 text-gray-500 underline text-sm"
          >
            Reset Progress
          </button>
        </div>
      )}
    </main>
  );
}