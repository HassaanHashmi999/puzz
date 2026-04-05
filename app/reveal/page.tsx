"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getCompletedPuzzles } from "../lib/progress";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RevealPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [bgElements, setBgElements] = useState<
    Array<{
      id: number;
      emoji: string;
      left: string;
      top: string;
      size: string;
      duration: number;
      delay: number;
    }>
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const imageFilenames = [
    "Image1.png",
    "Image2.png",
    "Image3.png",
    "Image4.png",
    "Image5.jpg",
    "Image6.jpg",
    "Image7.jpg",
    "Image8.jpg",
    "Image9.jpg",
    "Image10.jpg",
    "Image11.jpg",
    "Image12.jpg",
    "Image13.jpg",
    "Image14.jpg",
    "Image15.jpg",
    "Image16.jpg",
    "Image17.jpg",
    "Image18.jpg",
    "Image19.jpg",
    "Image20.jpg",
    "Image21.jpg",
  ];

  // Generate romantic background elements
  useEffect(() => {
    const emojis = [
      // Hearts
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💕",
      "💞", "💓", "💗", "💖", "💘", "💝", "💟", "❣️", "💔", "❤️‍🔥",
      // Roses & flowers
      "🌹", "🥀", "🌷", "🌸", "🌺", "🌼", "🌻", "🏵️", "💮", "🌿",
      // Sparkles
      "✨", "🌟", "⭐", "💫",
    ];

    const elements = [];
    for (let i = 0; i < 40; i++) {
      elements.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}rem`,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      });
    }
    setBgElements(elements);
  }, []);

  // Preload images and check access
  useEffect(() => {
    const completed = getCompletedPuzzles();
    if (!completed.includes(9)) {
      router.push("/puzzles/9");
      return;
    }

    const loadedImages = imageFilenames.map(
      (name) => `/reveal/${name}`
    );
    setImages(loadedImages);
  }, [router]);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/reveal/music.mp3"); 
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <main className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading memories...</div>
          <div className="w-16 h-16 border-4 border-t-white border-gray-600 rounded-full animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen text-white py-12 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #8b0000 0%, #4a0404 70%, #1a0000 100%)",
      }}
    >
      {/* Floating romantic elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute"
            style={{
              left: el.left,
              top: el.top,
              fontSize: el.size,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title with heartbeat animation */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px #8b0000, 0 0 40px #4a0404",
              "0 0 30px #8b0000, 0 0 60px #4a0404",
              "0 0 20px #8b0000, 0 0 40px #4a0404",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-5xl md:text-7xl font-bold text-center mb-8"
          style={{
            color: "#f28e8e",
            textShadow: "0 0 20px #8b0000, 0 0 40px #4a0404",
          }}
        >
          Happy 1 Year Anniversary, Love! ❤️
        </motion.h1>

        {/* Big Note with romantic styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-500/50 shadow-2xl"
          style={{
            boxShadow:
              "0 0 60px rgba(139, 0, 0, 0.3), inset 0 0 30px rgba(139, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-pink-300">
            Dil se Dil Tak
          </h2>
          <div
            className={`${cormorant.className} text-2xl md:text-3xl text-gray-100 leading-relaxed text-center whitespace-pre-line`}
            style={{ textShadow: "0 0 10px #8b0000" }}
          >
            {`
Tere bina, zindagi adhoori si lagti hai,
Teri muskaan, meri khushi ka raaz hai.
Tere saath har pal ek nayi kahani hai,
Tere pyaar mein, meri duniya roshan hai.


\n\n`}
          </div>

          {/* Music Player (above image slider) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={toggleMusic}
              className="group flex items-center gap-2 bg-pink-600/70 hover:bg-pink-700 backdrop-blur-sm px-5 py-2 rounded-full transition-all shadow-lg hover:scale-105"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              <span className="text-2xl">
                {isPlaying ? "🎵❤️" : "🎵♡"}
              </span>
              <span className="font-medium">
                {isPlaying ? "Stop" : "Dil se Music Bajao(click karo)"}
              </span>
            </button>
          </motion.div>

          {/* Image Slider with romantic frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-3xl mx-auto mb-16"
          >
            <div
              className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl border-4 border-pink-300/50"
              style={{
                boxShadow: "0 0 50px #8b0000",
                background: "linear-gradient(135deg, #2d0000, #4a0404)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            {/* Navigation buttons (heart-shaped) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-600/80 hover:bg-pink-700 text-white p-3 rounded-full backdrop-blur-sm transition text-2xl w-12 h-12 flex items-center justify-center"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              ❤
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-600/80 hover:bg-pink-700 text-white p-3 rounded-full backdrop-blur-sm transition text-2xl w-12 h-12 flex items-center justify-center"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              ❤
            </button>

            {/* Dots with heart pulses */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex
                      ? "text-pink-400 scale-125"
                      : "text-gray-400 hover:text-pink-300"
                  }`}
                >
                  {idx === currentIndex ? "❤️" : "○"}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold px-10 py-4 rounded-full text-xl hover:scale-105 transition-transform shadow-lg"
              style={{ boxShadow: "0 0 30px #8b0000" }}
            >
              Begin Again
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating sparkles (extra romance) */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-white text-opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </main>
  );
}