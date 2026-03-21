"use client"
import { getCompletedPuzzles, completePuzzle } from "../../lib/progress";
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Howl } from "howler"



export default function PuzzlePage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  useEffect(() => {
    const completed = getCompletedPuzzles();
    const maxCompleted = completed.length > 0 ? Math.max(...completed) : 0;

    // If all puzzles up to 9 are completed, allow any id 1-9
    if (maxCompleted >= 9) {
      if (id < 1 || id > 9) router.replace('/puzzles/1');
      return;
    }

    // Redirect if trying to access a puzzle that is not yet unlocked
    if (id > maxCompleted + 1) {
      const next = maxCompleted + 1;
      router.replace(`/puzzles/${next}`);
    }
  }, [id, router]);

  if (id === 1) return <PuzzleOne router={router} />
  if (id === 2) return <PuzzleTwo router={router} />
  if (id === 3) return <PuzzleThree />
  if (id === 4) return <PuzzleFour router={router} />
  if (id === 5) return <PuzzleFive router={router} />
  if (id === 6) return <PuzzleSix router={router} />
  if (id === 7) return <PuzzleSeven router={router} />
  if (id === 8) return <PuzzleEight router={router} />
  if (id === 9) return <PuzzleNine router={router} />;
  return <div className="text-white">Puzzle Not Found</div>
}
// ================== MAIN ROUTER ==================





function PuzzleOne({ router }: any) {
  const [pos, setPos] = useState({ x: 300, y: 300 })
  const [code, setCode] = useState("")
  const [msg, setMsg] = useState("")
  const [solved, setSolved] = useState(false)
  const [emojiData, setEmojiData] = useState<{
    positions: Array<{ top: number; left: number }>
    emojis: string[]
  } | null>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  useEffect(() => {
    const emojis = [
      "🧸","🐱","🐶","🌸","✨","🍓","🐼","🦋","🍭","🐰",
      "🌈","🍩","🐹","🎀","🍒","🧁","🐻","💖","🍬","🌼",
      "🐥","🍉","🌺","🐨","🍫","💫","🍪","🐯","🌻","🎈",
      "🍇","🐸","🫧","🧃","🐧","💗","🍡","🦄","🌙","⭐",
      "🍕","🐢","🌷","🐝","🍔","🪄","🍟","🐙","🧸","💝",
      "🍎","🐳","🌹","🧁","🐬","🍰","🐞","💘","🍑","🐤",
      "🍌","🐠","🍍","🐛","🍨","🐿️","🍓","🦊","🌟","🐌",
      "🫶","🍧","🦖","🍿","🐲","🍪","🐕","🐈","💞","🌸",
      "🍄","🐚","🧩","💜","🐱‍👤","🌵","💙","🍋","🧃","🐡"
    ]

    const positions = Array.from({ length: 100 }).map(() => ({
      top: Math.random() * 95,
      left: Math.random() * 95,
    }))

    const assignedEmojis = positions.map(() => 
      emojis[Math.floor(Math.random() * emojis.length)]
    )

    setEmojiData({ positions, emojis: assignedEmojis })
  }, [])

  const check = () => {
    
    if (code.trim() === "137") {
      setMsg("✨ Correct...")
      setSolved(true)
      completePuzzle(1);
      setTimeout(() => {
        router.push("/puzzles/2");
      }, 9000);
    } else {
      setMsg("❌ Wrong code")
    }
  }

  if (!emojiData) {
    return (
      <main className="relative w-screen h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading puzzle...
        </div>
      </main>
    )
  }

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden cursor-none transition-all duration-1000 ${
        solved ? "bg-white" : "bg-black"
      }`}
    >
      {/* 🔢 hidden numbers */}
      <div
        className={`absolute top-[18%] left-[12%] text-xl z-10 font-bold ${
          solved ? "text-red-600" : "text-gray-300"
        }`}
      >
        1
      </div>
      <div
        className={`absolute top-[72%] left-[68%] text-xl z-10 font-bold ${
          solved ? "text-red-600" : "text-gray-300"
        }`}
      >
        3
      </div>
      <div
        className={`absolute top-[48%] left-[42%] text-xl z-10 font-bold ${
          solved ? "text-red-600" : "text-gray-300"
        }`}
      >
        7
      </div>

      {/* fake numbers */}
      <div
        className={`absolute top-[30%] left-[80%] z-10 ${
          solved ? "text-black opacity-80" : "text-gray-400 opacity-40"
        }`}
      >
        9
      </div>
      <div
        className={`absolute top-[75%] left-[25%] z-10 ${
          solved ? "text-black opacity-80" : "text-gray-400 opacity-40"
        }`}
      >
        2
      </div>
      <div
        className={`absolute top-[55%] left-[8%] z-10 ${
          solved ? "text-black opacity-80" : "text-gray-400 opacity-40"
        }`}
      >
        8
      </div>
      <div
        className={`absolute top-[10%] left-[50%] z-10 ${
          solved ? "text-black opacity-80" : "text-gray-400 opacity-40"
        }`}
      >
        5
      </div>
      <div
        className={`absolute top-[85%] left-[50%] z-10 ${
          solved ? "text-black opacity-80" : "text-gray-400 opacity-40"
        }`}
      >
        4
      </div>

      {/* 💖 static emojis */}
      {emojiData.positions.map((pos, i) => (
        <div
          key={i}
          className="absolute text-2xl select-none z-0"
          style={{ top: pos.top + "%", left: pos.left + "%" }}
        >
          {emojiData.emojis[i]}
        </div>
      ))}

      {/* hint */}
      {!solved && (
        <div className="absolute bottom-[22%] left-[40%] text-lg font-bold text-white z-10">
          not all numbers matter...
        </div>
      )}

      {/* input */}
      {!solved && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <input
            className="bg-black border border-white p-3 text-white"
            placeholder="enter code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={check}
            className="ml-3 bg-white text-black px-4 py-3"
          >
            unlock
          </button>
          <p className="text-center mt-2">{msg}</p>
        </div>
      )}

      {/* 🔦 torch overlay */}
      {!solved && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(circle 110px at ${pos.x}px ${pos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.97) 65%, rgba(0,0,0,0.999) 100%)`,
          }}
        />
      )}

      {/* 🌕 light up */}
      {solved && (
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold z-20">
          🌕 LIGHT RESTORED
        </div>
      )}
    </main>
  )
}

function PuzzleTwo({ router }: any) {
  const [pos, setPos] = useState({ x: 300, y: 300 }); // mouse
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(""));
  const [solvedStars, setSolvedStars] = useState<boolean[]>(Array(7).fill(false));
  const [solved, setSolved] = useState(false);
  const [starPixels, setStarPixels] = useState<{ x: number; y: number }[]>([]);

  const routerNav = router;

  // Star positions in % (forming letter F)
  const starPositions = [
    { top: "20%", left: "40%" },
    { top: "35%", left: "40%" },
    { top: "50%", left: "40%" },
    { top: "20%", left: "50%" },
    { top: "35%", left: "50%" },
    { top: "20%", left: "60%" },
    { top: "50%", left: "50%" },
  ];

  // Predefined connections for the F shape
  const connections = [
    [0, 1], [1, 2], // vertical line
    [0, 3], [3, 5], // top horizontal bar (0-3-5)
    [1, 4],          // middle horizontal bar
    [2, 6],          // bottom horizontal bar
  ];

  // Questions for each star
  const questions = [
    "Flowers, she Likes (-----)",               // star 0
    "Her Favorite Chocolate? (mal...)",          // star 1
    "Hamna ka Mind is what? (snowfall with rainbow)?", // star 2
    "What animal barks?",                         // star 3
    "First letter of 'flower'?",                  // star 4
    "What do you drink in the morning?",          // star 5
    "What letter starts 'Fox'?"                   // star 6
  ];

  // Correct answers
  const correctAnswers = ["daisy", "maltesers", "innovative", "dog", "f", "tea", "f"];

  // Mouse position
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Calculate pixel positions of stars on mount and resize
  useEffect(() => {
    const calculatePositions = () => {
      const pixels = starPositions.map(star => ({
        x: (parseFloat(star.left) / 100) * window.innerWidth,
        y: (parseFloat(star.top) / 100) * window.innerHeight,
      }));
      setStarPixels(pixels);
    };

    calculatePositions();
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  // Handle answer submission
  const handleSubmit = (index: number) => {
    if (answers[index].toLowerCase().trim() === correctAnswers[index]) {
      const newSolved = [...solvedStars];
      newSolved[index] = true;
      setSolvedStars(newSolved);
      setActiveStar(null);

      // Check if all solved
      if (newSolved.every(s => s)) {
        setSolved(true);
        completePuzzle(2); // save progress
        setTimeout(() => router.push("/puzzles/3"), 9000);
      }
    } else {
      alert("Wrong answer");
    }
  };

  return (
    <main className={`relative w-screen h-screen overflow-hidden cursor-none transition-all duration-1000 ${solved ? "bg-white" : "bg-black"}`}>
      {/* Torch overlay */}
      {!solved && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,1) 100%)`,
          }}
        />
      )}

      {/* SVG for lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {connections.map(([from, to], idx) => {
          if (!solvedStars[from] || !solvedStars[to]) return null;
          const fromPos = starPixels[from];
          const toPos = starPixels[to];
          if (!fromPos || !toPos) return null;
          return (
            <line
              key={idx}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={solved ? "black" : "yellow"}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Stars */}
      {starPositions.map((star, i) => {
  const near = starPixels[i] 
    ? Math.hypot(pos.x - starPixels[i].x, pos.y - starPixels[i].y) < 150 
    : false;
  return (
    <div
      key={i}
      className={`absolute z-30 text-3xl transition-all duration-300 ${
        solvedStars[i] ? "text-yellow-400" : "text-white"
      }`}
      style={{
        top: star.top,
        left: star.left,
        opacity: solved ? 1 : near ? 1 : 0,
        cursor: "pointer",
      }}
      onClick={() => setActiveStar(i)}
    >
      ⭐
    </div>
  );
})}

      {/* Active star question */}
      {activeStar !== null && !solved && (
        <div
          className="absolute z-30 flex flex-col items-center"
          style={{
            top: `calc(${starPositions[activeStar].top} + 5%)`,
            left: starPositions[activeStar].left,
            transform: "translateX(-50%)",
          }}
        >
          <p className="text-white mb-2 text-center">{questions[activeStar]}</p>
          <input
            className="bg-black border border-white text-white p-2"
            value={answers[activeStar]}
            onChange={(e) => {
              const newAns = [...answers];
              newAns[activeStar] = e.target.value;
              setAnswers(newAns);
            }}
          />
          <button
            onClick={() => handleSubmit(activeStar)}
            className="mt-2 bg-white text-black px-4 py-2"
          >
            Submit
          </button>
        </div>
      )}

      {/* Solved message */}
      {solved && (
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold z-40">
          🌟 All stars solved! Moving next...
        </div>
      )}
    </main>
  );
}
function PuzzleThree() {
  const GRID = 6
  const MESSAGE = "LIGHT FOUND"
const router = useRouter()
  type Cell = {
    mine: boolean
    revealed: boolean
    letter?: string
  }

  const cleanMsg = MESSAGE.replace(/ /g, "")
  const lettersArr = cleanMsg.split("")

  const [board, setBoard] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)

  // persistent letters found in discovery order
  const [foundLetters, setFoundLetters] = useState<string[]>([])

  // final lock
  const [allFound, setAllFound] = useState(false)
  const [finalInput, setFinalInput] = useState("")
  const [ending, setEnding] = useState(false)

  const [message, setMessage] = useState("Find all letters!")

  // ===== create board =====
  const createBoard = () => {
    const total = GRID * GRID
    const mines = 8

    let flat: Cell[] = Array.from({ length: total }).map(() => ({
      mine: false,
      revealed: false,
    }))

    // place mines
    let placed = 0
    while (placed < mines) {
      const idx = Math.floor(Math.random() * total)
      if (!flat[idx].mine) {
        flat[idx].mine = true
        placed++
      }
    }

    // safe indexes shuffled
    const safeIndexes = flat
      .map((c, i) => (!c.mine ? i : null))
      .filter((v) => v !== null) as number[]

    for (let i = safeIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[safeIndexes[i], safeIndexes[j]] = [safeIndexes[j], safeIndexes[i]]
    }

    // place letters randomly in safe tiles
    lettersArr.forEach((letter, i) => {
      flat[safeIndexes[i]].letter = letter
    })

    // convert flat array to 2D grid
    let grid: Cell[][] = []
    for (let r = 0; r < GRID; r++) {
      grid.push(flat.slice(r * GRID, (r + 1) * GRID))
    }

    setBoard(grid)
    setGameOver(false)
  }

  useEffect(() => {
    createBoard()
  }, [])

  // ===== click cell =====
  const clickCell = (r: number, c: number) => {
    if (ending) return

    const newBoard = [...board]
    const cell = newBoard[r][c]

    if (cell.revealed) return
    cell.revealed = true

    // 💣 mine
    if (cell.mine) {
      setGameOver(true)
      setMessage("💣 Mine hit — board reshuffled!")
      setTimeout(() => createBoard(), 400) // letters persist
      setBoard(newBoard)
      return
    }

    // 🔤 letter
    if (cell.letter) {
      const totalNeeded = lettersArr.filter(l => l === cell.letter).length
      const alreadyFound = foundLetters.filter(l => l === cell.letter).length

      if (alreadyFound >= totalNeeded) {
        setMessage(`"${cell.letter}" already found`)
      } else {
        // append letter in discovery order
        setFoundLetters(prev => {
          const updated = [...prev, cell.letter!]

          if (updated.length === lettersArr.length) {
            setAllFound(true)
            setMessage("🎉 All letters found! Unscramble the message.")
          } else {
            setMessage(`Found letter: ${cell.letter}`)
          }

          return updated
        })
      }
    }

    setBoard(newBoard)
  }

  // ===== final input =====
  const checkFinal = () => {
    if (finalInput.toUpperCase().trim() === MESSAGE) {
      setEnding(true)
    } else {
      alert("Wrong message")
    }
  }

  // dash display: letters filled in discovery order
  const dashDisplay = Array.from({ length: lettersArr.length }).map(
    (_, i) => foundLetters[i] || "_"
  )

  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center">
      {!ending && (
        <>
          <h1 className="text-3xl mb-4 font-bold">💣 Final Puzzle</h1>
          <p className="text-gray-400 mb-6">{message}</p>

          {/* ===== found letters / dashes ===== */}
          <div className="flex gap-2 text-3xl mb-10 tracking-widest">
            {dashDisplay.map((l, i) => (
              <span key={i} className="border-b-2 border-white w-6 text-center">
                {l}
              </span>
            ))}
          </div>

          {/* ===== grid ===== */}
          {!allFound && (
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${GRID}, 70px)` }}
            >
              {board.map((row, r) =>
                row.map((cell, c) => (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => clickCell(r, c)}
                    className={`
                      w-[70px] h-[70px]
                      flex items-center justify-center
                      border border-gray-700
                      text-2xl font-bold
                      cursor-pointer
                      transition-all duration-200
                      ${
                        cell.revealed
                          ? cell.mine
                            ? "bg-red-600"
                            : "bg-gray-800"
                          : "bg-gray-900 hover:bg-gray-700"
                      }
                    `}
                  >
                    {cell.revealed ? (
                      cell.mine ? (
                        "💣"
                      ) : cell.letter ? (
                        <span className="text-yellow-300">{cell.letter}</span>
                      ) : (
                        "👾"
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== final input ===== */}
          {allFound && !ending && (
  <div className="mt-10 flex flex-col items-center">
    <p className="mb-3 text-xl">Unscramble the message</p>
    <input
      className="bg-black border border-white p-3 text-white"
      value={finalInput}
      onChange={(e) => setFinalInput(e.target.value)}
    />
    <button
      onClick={() => {
  if (finalInput.toUpperCase().trim() === MESSAGE) {
    setEnding(true);
    setTimeout(() => {
      completePuzzle(3);
      router.push("/puzzles/4");
    }, 3000);
  } else {
    alert("Wrong message");
  }
}}
      className="mt-4 bg-white text-black px-6 py-3"
    >
      Unlock ending
    </button>
  </div>
)}
        </>
      )}

      {/* ===== TRUE ENDING ===== */}
      {ending && (
        <div className="text-center">
          <div className="text-6xl mb-6">🌕</div>
          <h1 className="text-5xl font-bold mb-4">YOU ESCAPED</h1>
          <p className="text-gray-400">The light was always real.</p>
        </div>
      )}
    </main>
  )

  
}
function PuzzleFour({ router }: any) {
  const [phase, setPhase] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [difficulty, setDifficulty] = useState(1);
  
  const COLOR_CLASSES = [
    "bg-red-500", 
    "bg-blue-500", 
    "bg-green-500", 
    "bg-yellow-500", 
    "bg-purple-500", 
    "bg-orange-500", 
    "bg-pink-500", 
    "bg-cyan-500"
  ];
  
  const [sequenceLength, setSequenceLength] = useState(5)
  const [currentSequence, setCurrentSequence] = useState<{index: number, isSloth: boolean}[]>([])

  const [sequence, setSequence] = useState<number[]>([])
  const [slothSequence, setSlothSequence] = useState<number[]>([])
  const [playerInput, setPlayerInput] = useState<number[]>([])
  const [flashIndex, setFlashIndex] = useState<number | null>(null)
  const [flashType, setFlashType] = useState<"fist" | "sloth" | null>(null)
  const [message, setMessage] = useState("Press Start to begin!")
  const [levelComplete, setLevelComplete] = useState(false)
  const [started, setStarted] = useState(false)
  const [wrongTiles, setWrongTiles] = useState<number[]>([])
  const [showAllSloths, setShowAllSloths] = useState(false)
  const [phaseTransition, setPhaseTransition] = useState(false)
  const [revealPattern, setRevealPattern] = useState(false)
  const [flashStep, setFlashStep] = useState(0)
  const [showPhase2Button, setShowPhase2Button] = useState(false) // NEW: Control phase 2 button

  // Generate a pattern-based sequence for phase 2
  const generatePatternSequence = (size: number, length: number) => {
    const totalTiles = size * size
    const patternSeq: {index: number, isSloth: boolean}[] = []
    const slothIndices: number[] = []
    
    if (size === 4) {
      // Define patterns for 4x4 grid
      const patterns = [
        [0, 5, 10, 15], // Diagonal
        [1, 2, 9, 10], // Square
        [0, 4, 8, 9, 10], // L-shape
        [5, 6, 9, 10], // Cross
        [0, 1, 2, 5, 8, 9, 10, 13, 14, 15] // Z-pattern
      ]
      
      const pattern = patterns[Math.floor(Math.random() * patterns.length)]
      
      for (let i = 0; i < length; i++) {
        const patternIndex = i % pattern.length
        const tileIndex = pattern[patternIndex]
        const isSloth = Math.random() > 0.5 // 50% chance for sloth
        
        patternSeq.push({index: tileIndex, isSloth})
        if (isSloth) {
          slothIndices.push(tileIndex)
        }
      }
    }
    
    return { patternSeq, slothIndices }
  }

  // Generate a fresh random sequence
  const generateSequence = () => {
    const totalTiles = gridSize * gridSize
    
    if (phase === 1) {
      const seq = Array.from({ length: sequenceLength }).map(
        () => Math.floor(Math.random() * totalTiles)
      )
      setSequence(seq)
      return { seq: seq.map(idx => ({ index: idx, isSloth: false })), slothIndices: [] }
    } else {
      const { patternSeq, slothIndices } = generatePatternSequence(gridSize, sequenceLength * 2)
      setCurrentSequence(patternSeq)
      setSlothSequence(slothIndices)
      return { seq: patternSeq, slothIndices }
    }
  }

  // Flash tiles one by one
  const flashSequence = (seq: {index: number, isSloth: boolean}[]) => {
    let i = 0
    setMessage(phase === 1 ? "Watch the sequence!" : "Memorize the pattern! Focus on SLOTHS!")
    setRevealPattern(true)
    setFlashStep(0)
    
    const interval = setInterval(() => {
      const currentItem = seq[i]
      setFlashIndex(currentItem.index)
      setFlashType(currentItem.isSloth ? "sloth" : "fist")
      setFlashStep(i)
      i++
      
      if (i >= seq.length) {
        clearInterval(interval)
        setTimeout(() => {
          setFlashIndex(null)
          setFlashType(null)
          setRevealPattern(false)
        }, 500)
        setMessage(phase === 1 ? "Now repeat the sequence!" : "Now click ONLY the sloths in order!")
      }
    }, phase === 1 ? 800 : 600)
  }

  const startGame = () => {
    setStarted(true)
    setPlayerInput([])
    setWrongTiles([])
    setLevelComplete(false)
    setShowAllSloths(false)
    setRevealPattern(false)
    setFlashIndex(null)
    setFlashType(null)
    
    if (phase === 1) {
      setSequenceLength(5 + difficulty)
    } else {
      setSequenceLength(8 + difficulty * 2)
    }
    
    const { seq, slothIndices } = generateSequence()
    flashSequence(seq)
  }

  const startPhaseTwo = () => {
    setPhaseTransition(true)
    setMessage("")
    setShowAllSloths(true)
    
    setTimeout(() => {
      setPhaseTransition(false)
      setPhase(2)
      setGridSize(4)
      setDifficulty(prev => prev + 1)
      setStarted(false)
      setLevelComplete(false)
      setShowAllSloths(false)
      setShowPhase2Button(true) // Show the button for phase 2
      setMessage("Phase 2: Find the sloths in the pattern! 4x4 Grid!")
      // Removed the automatic startGame call
    }, 3000)
  }

  const clickTile = (idx: number) => {
    if (!started || levelComplete || flashIndex !== null) return

    if (phase === 1) {
      const nextInput = [...playerInput, idx]
      setPlayerInput(nextInput)

      const correct = sequence[nextInput.length - 1] === idx

      if (!correct) {
        setMessage("❌ Wrong tile! Generating new sequence...")
        setWrongTiles(prev => [...prev, idx])
        setPlayerInput([])

        setTimeout(() => {
          setWrongTiles([])
          const { seq } = generateSequence()
          flashSequence(seq)
        }, 1000)
        return
      }

      if (nextInput.length === sequence.length) {
        setMessage("🎉 Sequence complete!")
        setLevelComplete(true)
        setTimeout(startPhaseTwo, 2000)
      }
    } else {
      const currentSlothIndex = playerInput.length
      const expectedSlothIndex = slothSequence[currentSlothIndex]
      
      const isSlothInSequence = slothSequence.includes(idx)
      const isExpectedSloth = expectedSlothIndex === idx
      
      if (!isSlothInSequence) {
        setMessage("❌ That's not a sloth in the pattern! Only click the sloths!")
        setWrongTiles(prev => [...prev, idx])
        setPlayerInput([])
        
        setTimeout(() => {
          setWrongTiles([])
          const { seq } = generateSequence()
          flashSequence(seq)
        }, 1500)
        return
      }
      
      if (!isExpectedSloth) {
        setMessage("❌ Wrong sloth order! Remember the pattern sequence!")
        setWrongTiles(prev => [...prev, idx])
        setPlayerInput([])
        
        setTimeout(() => {
          setWrongTiles([])
          const { seq } = generateSequence()
          flashSequence(seq)
        }, 1500)
        return
      }
      
      const nextInput = [...playerInput, idx]
      setPlayerInput(nextInput)
      
      if (nextInput.length === slothSequence.length) {
        setMessage("🎉 Pattern mastered! All sloths remembered!")
        setLevelComplete(true)
        setShowAllSloths(true)
        
        setTimeout(() => {
  completePuzzle(4);
  router.push("/puzzles/5");
}, 3000);
      }
    }
  }

  // Determine what to display on each tile
  const getTileContent = (idx: number) => {
    const isFlashing = flashIndex === idx
    const isCorrect = playerInput.includes(idx)
    const isWrong = wrongTiles.includes(idx)
    
    if (phaseTransition && showAllSloths) {
      return "🦥"
    }
    
    if (phase === 1) {
      if (isFlashing) return "👊"
      if (isCorrect && !isFlashing) return "👊"
      if (isWrong && !isFlashing) return "💥"
      return ""
    } else {
      if (showAllSloths && levelComplete) {
        return "🦥"
      }
      
      if (isFlashing) {
        return flashType === "sloth" ? "🦥" : "👊"
      }
      
      if (isCorrect && !isFlashing) {
        const wasSloth = slothSequence.includes(idx)
        return wasSloth ? "🦥" : "👊"
      }
      
      if (isWrong && !isFlashing) {
        return "💥"
      }
      
      if (revealPattern) {
        const currentItem = currentSequence[flashStep]
        if (currentItem && currentItem.index === idx) {
          return currentItem.isSloth ? "🦥" : "👊"
        }
      }
      
      return ""
    }
  }

  // Get background color class
  const getTileBackground = (idx: number) => {
    const isFlashing = flashIndex === idx
    const isCorrect = playerInput.includes(idx)
    const isWrong = wrongTiles.includes(idx)
    
    if (isFlashing) {
      return COLOR_CLASSES[idx % COLOR_CLASSES.length] + " scale-110"
    }
    
    if (isCorrect) {
      return "bg-green-600"
    }
    
    if (isWrong) {
      return "bg-red-600"
    }
    
    if (phase === 2 && slothSequence.includes(idx) && !revealPattern) {
      return "bg-emerald-900"
    }
    
    if (revealPattern && phase === 2) {
      const seqItem = currentSequence.find(item => item.index === idx)
      if (seqItem) {
        return seqItem.isSloth ? "bg-emerald-700" : "bg-amber-800"
      }
    }
    
    return "bg-gray-800"
  }

  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4 font-bold">
        {phase === 1 ? "Level 4: Memory Sequence" : "Level 4: Pattern Memory"}
      </h1>
      
      {phaseTransition ? (
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold text-red-500 mb-4 animate-bounce" style={{fontFamily: "'Comic Sans MS', cursive"}}>
            Ha ha ha!
          </h2>
          <p className="text-2xl text-yellow-400" style={{fontFamily: "'Comic Sans MS', cursive"}}>
            Think you're smart? Try THIS!
          </p>
          <p className="text-lg text-gray-400 mt-4">
            Pattern complexity: {difficulty + 1}/10
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6 text-center max-w-md">{message}</p>
          
          {/* Phase 2 instructions */}
          {phase === 2 && !started && !levelComplete && (
            <div className="bg-gray-900 p-4 rounded-lg mb-6 max-w-md">
              <p className="text-lg text-yellow-400 mb-2">⚠️ Pattern Challenge:</p>
              <p className="text-sm text-gray-300 mb-1">• Memorize the <span className="text-emerald-400">SLOTHS (🦥)</span> in complex patterns</p>
              <p className="text-sm text-gray-300 mb-1">• Ignore the fists (👊)</p>
              <p className="text-sm text-gray-300">• Patterns include shapes, diagonals, and sequences</p>
              <p className="text-xs text-gray-500 mt-2">Difficulty: {difficulty}/10</p>
            </div>
          )}

          {/* Game start button - shows in different situations */}
          {(phase === 1 && !started && !levelComplete) || 
           (phase === 2 && showPhase2Button && !started && !levelComplete) ? (
            <button
              className="bg-white text-black px-6 py-3 mb-6 rounded-lg hover:bg-gray-200 transition-colors font-bold"
              onClick={startGame}
            >
              {phase === 1 ? "Start Challenge" : "Start Pattern Challenge"}
            </button>
          ) : null}
        </>
      )}

      <div
        className="grid gap-3"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 80px)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
          const content = getTileContent(idx)
          const bgClass = getTileBackground(idx)
          
          return (
            <div
              key={idx}
              onClick={() => clickTile(idx)}
              className={`
                w-[80px] h-[80px] rounded-lg flex items-center justify-center text-3xl 
                cursor-pointer transition-all duration-300 ${bgClass}
                ${phase === 2 ? 'border border-gray-700' : ''}
                transform hover:scale-105 active:scale-95
                ${(!started && phase === 2) ? 'opacity-70' : ''}
              `}
              style={{
                animation: flashIndex === idx ? 'pulse 0.5s ease-in-out' : 'none',
              }}
            >
              {content}
            </div>
          )
        })}
      </div>
      
      {/* Game status info */}
      {phase === 2 && started && (
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl">🦥</span>
              <span className="text-sm text-emerald-400">Sloth to click</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl">👊</span>
              <span className="text-sm text-gray-400">Ignore</span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Sequence length: {currentSequence.length} | Sloths to remember: {slothSequence.length}
          </p>
          {playerInput.length > 0 && (
            <p className="text-sm text-green-400 mt-2">
              Progress: {playerInput.length}/{slothSequence.length} sloths
            </p>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </main>
  )
}


  



function PuzzleFive({ router }: any) {
  

  // ---------------- SOUND SYSTEM ----------------
  const play = (src:string, vol=0.4)=>{
    try{
      const s = new Howl({src:[src], volume:vol})
      s.play()
    }catch{}
  }

  // ---------------- STATES ----------------
  const [boxOpened,setBoxOpened]=useState([false,false,false])
  const [answer1,setAnswer1]=useState("")
  const [error1,setError1]=useState("")
  const [day,setDay]=useState("")
  const [month,setMonth]=useState("")
  const [year,setYear]=useState("")
  const [error2,setError2]=useState("")
  const [ropeVisible,setRopeVisible]=useState(false)
  const [ropeCut,setRopeCut]=useState(false)
  const [story,setStory]=useState("Love is not found. It is decoded.")

  const allOpened = boxOpened.every(Boolean)

  // ambient sound
  useEffect(()=>{
    play("/sounds/ambient.mp3",0.15)
    setTimeout(()=>setRopeVisible(true),4000) // rope appears later
  },[])

  // ---------------- BOX 1 ----------------
  const handleBox1=()=>{
    if(answer1.trim().toLowerCase()==="heart"){
      play("/sounds/unlock.mp3")
      setBoxOpened(p=>{const n=[...p]; n[0]=true; return n})
      setStory("Love begins where logic fails.")
      setError1("")
    }else{
      play("/sounds/error.mp3")
      setError1("Not everything is logical.")
    }
  }

  // ---------------- BOX 2 ----------------
  const handleBox2=()=>{
    if(day==="18"&&month==="12"&&year==="25"){
      play("/sounds/unlock.mp3")
      setBoxOpened(p=>{const n=[...p]; n[1]=true; return n})
      setStory("Time means nothing when two souls align.")
      setError2("")
    }else{
      play("/sounds/error.mp3")
      setError2("Time is not the answer you seek.")
    }
  }

  // ---------------- ROPE CUT ----------------
  const cutRope=()=>{
    play("/sounds/cut.mp3")
    setRopeCut(true)

    setTimeout(()=>{
      setBoxOpened(p=>{const n=[...p]; n[2]=true; return n})
      setStory("Freedom is the final form of love.")
    },800)
  }

  // ---------------- CONTINUE ----------------
  const handleContinue = () => {
  play("/sounds/success.mp3");
  completePuzzle(5);
  setTimeout(() => router.push("/puzzles/6"), 1200);
};

  const dayOptions = Array.from({length:31},(_,i)=>i+1)
  const monthOptions = Array.from({length:12},(_,i)=>i+1)
  const yearOptions = Array.from({length:30},(_,i)=>i+1)

  return (
    <main className="relative h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,100,0.15),black_60%)]"/>

      {/* STORY TEXT */}
      <motion.div
        key={story}
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="absolute top-16 text-xl text-pink-300 italic"
      >
        {story}
      </motion.div>

      {/* HIDDEN ROPE TOP RIGHT */}
      {ropeVisible && !ropeCut && (
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:0.2}}
          whileHover={{opacity:1,scale:1.2}}
          className="absolute top-8 right-10 cursor-pointer"
        >
          <div className="relative group">
            <span className="text-5xl">🪢</span>

            <button
              onClick={cutRope}
              className="absolute -bottom-12 right-0 opacity-0 group-hover:opacity-100 transition bg-red-600 p-3 rounded-full shadow-lg hover:scale-110"
            >
              ✂️
            </button>
          </div>
        </motion.div>
      )}

      {/* BOXES */}
      <div className="flex gap-12 flex-wrap justify-center z-10">

        {/* BOX 1 */}
        <motion.div
          animate={boxOpened[0]?{scale:1.05,boxShadow:"0 0 30px #22c55e"}:{}}
          className="w-72 h-60 bg-black/70 border border-gray-700 rounded-xl p-5 flex flex-col items-center justify-center backdrop-blur"
        >
          <h2 className="mb-3">📦 Box of Emotion</h2>

          {!boxOpened[0] ? (
            <>
              <p className="text-gray-400 mb-2">Symbol of love?</p>
              <input value={answer1} onChange={e=>setAnswer1(e.target.value)}
                className="bg-black border border-white p-2 rounded mb-2 text-center"/>
              <button onClick={handleBox1} className="bg-white text-black px-4 py-2 rounded">Unlock</button>
              {error1 && <p className="text-red-400 mt-2">{error1}</p>}
            </>
          ) : <p className="text-green-400 text-lg">Opened</p>}
        </motion.div>

        {/* BOX 2 */}
        <motion.div
          animate={boxOpened[1]?{scale:1.05,boxShadow:"0 0 30px #22c55e"}:{}}
          className="w-72 h-60 bg-black/70 border border-gray-700 rounded-xl p-5 flex flex-col items-center justify-center backdrop-blur"
        >
          <h2 className="mb-3">📦 Box of Time</h2>

          {!boxOpened[1] ? (
            <>
              <p className="text-gray-400 mb-2">Enter the perfect date</p>
              <div className="flex gap-2">
                <select value={month} onChange={e=>setMonth(e.target.value)} className="bg-black border p-2">
                  <option>MM</option>
                  {monthOptions.map(m=><option key={m} value={m.toString().padStart(2,"0")}>{m.toString().padStart(2,"0")}</option>)}
                </select>
                <select value={day} onChange={e=>setDay(e.target.value)} className="bg-black border p-2">
                  <option>DD</option>
                  {dayOptions.map(d=><option key={d} value={d.toString().padStart(2,"0")}>{d.toString().padStart(2,"0")}</option>)}
                </select>
                <select value={year} onChange={e=>setYear(e.target.value)} className="bg-black border p-2">
                  <option>YY</option>
                  {yearOptions.map(y=><option key={y} value={y.toString().padStart(2,"0")}>{y.toString().padStart(2,"0")}</option>)}
                </select>
              </div>
              <button onClick={handleBox2} className="bg-white text-black px-4 py-2 rounded mt-3">Unlock</button>
              {error2 && <p className="text-red-400 mt-2">{error2}</p>}
            </>
          ) : <p className="text-green-400 text-lg">Opened</p>}
        </motion.div>

        {/* BOX 3 */}
        <motion.div
          animate={boxOpened[2]?{scale:1.05,boxShadow:"0 0 30px #22c55e"}:{}}
          className="w-72 h-60 bg-black/70 border border-gray-700 rounded-xl p-5 flex flex-col items-center justify-center backdrop-blur"
        >
          <h2 className="mb-3">📦 Box of Freedom</h2>
          {!boxOpened[2] ? (
            <p className="text-gray-500 italic">Something invisible binds it…</p>
          ) : <p className="text-green-400 text-lg">Opened</p>}
        </motion.div>

      </div>

      {/* FINAL */}
      <AnimatePresence>
      {allOpened && (
        <motion.div
          initial={{opacity:0,scale:0.8}}
          animate={{opacity:1,scale:1}}
          className="absolute bottom-20 text-center"
        >
          <p className="text-3xl text-pink-400 mb-4">Love unlocked.</p>
          <button onClick={handleContinue} className="bg-white text-black px-8 py-3 rounded-lg text-lg font-bold">
            Continue →
          </button>
        </motion.div>
      )}
      </AnimatePresence>

    </main>
  )
}

// ================== PUZZLE 6 – DETECTIVE ==================
function PuzzleSix({ router }: any) {
  // --- Suspects (same as before) ---
  const [suspects, setSuspects] = useState([
    { name: "Hafsa", statement: "Blah Blah,Blah", interrogated: false, guilty: false },
    { name: "Saliha", statement: "Chachu ne Blue color ki shirt istari honay ko di thi", interrogated: false, guilty: false },
    { name: "Shazi Khala", statement: "Main Bala dhoond rahi thi, Salik our Hassaan ki team bani hai", interrogated: false, guilty: false },
    { name: "Talha", statement: "Mujhe Awaaz Ai thi uss ki, Apnay Mian se Pooch.", interrogated: false, guilty: false },
    { name: "Maliha Mami", statement: "Mujhe Kaam karnay do I'm BUsy Darling", interrogated: false, guilty: false },
    { name: "Kashif Ali Shah Gujjar", statement: "I'm not your mahram, but saw a person with blue shirt uss side bhagtay huway.", interrogated: false, guilty: false },
    { name: "Asim Chachu", statement: "Hamna Betay main so raha tha...hehehe, Kasame", interrogated: false, guilty: true },
    { name: "Hadi", statement: "Mena balloon. urr urr, Meethu Tota urr urr menay pas.", interrogated: false, guilty: false },
    { name: "Nana Abu", statement: "Koi letter mila hai?", interrogated: false, guilty: false },
  ]);

  // --- Evidence (same) ---
  const [evidence, setEvidence] = useState([
    { id: "cricket", label: "🏏 Cricket Bat", description: "Found near the cage, with a tiny feather stuck to it.", examined: false },
    { id: "poolparty", label: "🏊 Pool Party Photo", description: "Shows everyone having fun… except someone is missing from the group shot.", examined: false },
    { id: "letter", label: "✉️ Hidden Letter", description: "Letter says:: 'Saliha Tota pakar liya hai'", examined: false },
    { id: "footage", label: "📹 Security Footage", description: "A child with a glowing balloon points toward the pool. A figure in a blue shirt sneaks away with a cage.", examined: false },
    { id: "balloon", label: "🎈 Glowing Balloon", description: "Found floating near the pool. Has 'A.C.' written on it in marker.", examined: false },
  ]);

  const [accusation, setAccusation] = useState<string | null>(null);
  const [caseSolved, setCaseSolved] = useState(false);
  const [message, setMessage] = useState("🔍 Bacha lo Meethu ko!");
  const [showContinue, setShowContinue] = useState(false);

  const guiltyIndex = 6;
  useEffect(() => {
    setSuspects(prev =>
      prev.map((s, i) => ({ ...s, guilty: i === guiltyIndex }))
    );
  }, []);

  const interrogate = (index: number) => {
    if (caseSolved) return;
    setSuspects(prev =>
      prev.map((s, i) => (i === index ? { ...s, interrogated: true } : s))
    );
    setMessage(`"${suspects[index].statement}" – ${suspects[index].name}`);
  };

  const examineEvidence = (id: string) => {
    if (caseSolved) return;
    setEvidence(prev =>
      prev.map(e => (e.id === id ? { ...e, examined: true } : e))
    );
    const item = evidence.find(e => e.id === id);
    setMessage(`🔍 ${item?.description}`);
  };

  const makeAccusation = (name: string) => {
    if (caseSolved) return;
    setAccusation(name);
    const isCorrect = suspects.find(s => s.name === name)?.guilty;
    if (isCorrect) {
      setMessage(`✅ Correct! ${name} is the thief. Meethu is recovered safe and sound!`);
      setCaseSolved(true);
      setTimeout(() => setShowContinue(true), 2000);
    } else {
      setMessage(`❌ ${name} is innocent. lagay raho, Detective Hamna.`);
      setAccusation(null);
    }
  };

  const handleContinue = () => {
    completePuzzle(6);
    router.push("/puzzles/7");
  };

  return (
    // Changed: min-h-screen, justify-start, overflow-auto
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 overflow-auto">
      <h1 className="text-4xl font-bold mb-2">
        🕵️‍♀️ Detective Hamna: The Case of the Missing Meethu
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Your beloved parrot Meethu is Gayab! Nine suspects were at the pool party.
        Gather clues, interrogate(Pooch tach), and find the culprit before the trail goes cold.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {/* Suspects grid (unchanged) */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            🧑‍⚖️ Suspects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suspects.map((s, i) => (
              <div
                key={s.name}
                className={`p-4 rounded-lg border ${
                  s.guilty && caseSolved
                    ? "border-red-500 bg-red-900/30"
                    : "border-gray-700 bg-gray-900/80"
                } ${s.interrogated ? "border-l-4 border-l-yellow-400" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-bold">{s.name}</p>
                    {s.interrogated && (
                      <p className="text-sm text-gray-300 mt-1 italic">
                        "{s.statement}"
                      </p>
                    )}
                  </div>
                  {!caseSolved && (
                    <button
                      onClick={() => interrogate(i)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm rounded"
                    >
                      Interrogate
                    </button>
                  )}
                </div>
                {s.guilty && caseSolved && (
                  <p className="text-red-400 text-sm mt-2">🔴 Guilty</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evidence (unchanged) */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            🔎 Evidence Locker
          </h2>
          <div className="space-y-4">
            {evidence.map(e => (
              <div
                key={e.id}
                className={`p-4 rounded-lg border ${
                  e.examined
                    ? "border-green-600 bg-green-900/30"
                    : "border-gray-700 bg-gray-900/80"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">{e.label}</p>
                    {e.examined && (
                      <p className="text-sm text-gray-300 mt-1">{e.description}</p>
                    )}
                  </div>
                  {!caseSolved && !e.examined && (
                    <button
                      onClick={() => examineEvidence(e.id)}
                      className="bg-amber-600 hover:bg-amber-700 px-3 py-1 text-sm rounded"
                    >
                      Examine
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accusation panel (unchanged) */}
      <div className="mt-10 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4">⚖️ Accuse the Thief</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {suspects.map(s => (
            <button
              key={s.name}
              onClick={() => makeAccusation(s.name)}
              disabled={caseSolved}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition ${
                caseSolved
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        {accusation && !caseSolved && (
          <p className="mt-4 text-yellow-400">You accuse {accusation}...</p>
        )}
      </div>

      {/* Message & Continue */}
      <div className="mt-8 text-center">
        <p className="text-xl mb-4">{message}</p>
        {showContinue && (
          <button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
          >
            Continue →
          </button>
        )}
      </div>
    </main>
  );
}

function PuzzleSeven({ router }: any) {
  const GRID_SIZE = 4
  const TOTAL_TILES = GRID_SIZE * GRID_SIZE
  const TILE_SIZE = 70

  const IMAGE_URL = "/sunflower.jpg"   // <-- your image path (place in /public)

  const [tileOrder, setTileOrder] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [message, setMessage] = useState("Loading image...")
  const [showContinue, setShowContinue] = useState(false)

  // ---------- Preload image ----------
  useEffect(() => {
    const img = new Image()
    img.src = IMAGE_URL
    img.onload = () => {
      setImageLoaded(true)
      setMessage("Rearrange the tiles (adjacent swaps only).")
    }
    img.onerror = () => {
      setMessage("Failed to load image. Check the file path.")
    }
  }, [])

  // ---------- Shuffle on mount ----------
  useEffect(() => {
    const initial = Array.from({ length: TOTAL_TILES }, (_, i) => i)
    for (let i = initial.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[initial[i], initial[j]] = [initial[j], initial[i]]
    }
    setTileOrder(initial)
  }, [])

  // ---------- Check win condition ----------
  const checkSolved = (order: number[]) => {
    const isMatch = order.every((val, idx) => val === idx)
    if (isMatch) {
      setSolved(true)
      setMessage("✨ Image restored! You piece the light back together. ✨")
      setTimeout(() => setShowContinue(true), 1500)
    }
    return isMatch
  }

  // ---------- Helper: are two tiles adjacent? ----------
  const areAdjacent = (idx1: number, idx2: number) => {
    const row1 = Math.floor(idx1 / GRID_SIZE)
    const col1 = idx1 % GRID_SIZE
    const row2 = Math.floor(idx2 / GRID_SIZE)
    const col2 = idx2 % GRID_SIZE
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1
  }

  // ---------- Handle click (adjacent swap only) ----------
  const handleTileClick = (index: number) => {
    if (solved || !imageLoaded) return

    // No tile selected yet
    if (selectedIndex === null) {
      setSelectedIndex(index)
      return
    }

    // Click same tile → deselect
    if (selectedIndex === index) {
      setSelectedIndex(null)
      return
    }

    // Check adjacency
    if (!areAdjacent(selectedIndex, index)) {
      setMessage("❌ Tiles are not adjacent – you can only swap neighbouring tiles.")
      setSelectedIndex(null)
      return
    }

    // Swap the two tiles
    const newOrder = [...tileOrder]
    ;[newOrder[selectedIndex], newOrder[index]] = [newOrder[index], newOrder[selectedIndex]]
    setTileOrder(newOrder)
    setSelectedIndex(null)
    setMessage("Rearrange the tiles (adjacent swaps only).")
    checkSolved(newOrder)
  }

  // ---------- Shuffle button ----------
  const shuffleGrid = () => {
    if (solved || !imageLoaded) return
    const shuffled = [...tileOrder]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setTileOrder(shuffled)
    setSelectedIndex(null)
    setMessage("Shuffled! Rearrange the tiles (adjacent swaps only).")
  }

  // ---------- Continue ----------
  const handleContinue = () => {
  completePuzzle(7);
  router.push("/puzzles/8");
};

  // ---------- CSS slice: exact pixel offset ----------
  const getTileStyle = (originalIndex: number) => {
    const row = Math.floor(originalIndex / GRID_SIZE)
    const col = originalIndex % GRID_SIZE
    return {
      backgroundImage: `url(${IMAGE_URL})`,
      backgroundSize: `${GRID_SIZE * TILE_SIZE}px ${GRID_SIZE * TILE_SIZE}px`,
      backgroundPosition: `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`,
      backgroundRepeat: "no-repeat",
    }
  }

  // ---------- Loading state ----------
  if (!imageLoaded) {
    return (
      <main className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">🖼️ Loading image...</div>
          <div className="w-16 h-16 border-4 border-t-white border-gray-600 rounded-full animate-spin mx-auto" />
        </div>
      </main>
    )
  }

  // ---------- Main render ----------
  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center p-6 overflow-auto">
      <h1 className="text-4xl font-bold mb-2">🧩 Image Shuffle</h1>
      <p className="text-gray-400 mb-6 text-center max-w-xl">{message}</p>

      {/* Puzzle grid – no target */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)` }}
      >
        {tileOrder.map((originalIndex, displayIndex) => (
          <div
            key={displayIndex}
            onClick={() => handleTileClick(displayIndex)}
            className={`
              w-[${TILE_SIZE}px] h-[${TILE_SIZE}px] bg-gray-800 rounded-lg border-2 
              transition-all duration-150 cursor-pointer
              ${
                selectedIndex === displayIndex
                  ? "border-yellow-400 scale-105"
                  : "border-gray-700"
              }
              ${solved ? "cursor-not-allowed opacity-90" : "hover:border-white"}
            `}
            style={getTileStyle(originalIndex)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex gap-4">
        {!solved && (
          <button
            onClick={shuffleGrid}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            🔀 Shuffle
          </button>
        )}
        {showContinue && (
          <button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition animate-pulse"
          >
            Continue →
          </button>
        )}
      </div>

      {selectedIndex !== null && !solved && (
        <p className="mt-4 text-yellow-400">
          Tile selected. Click an <span className="font-bold">adjacent</span> tile to swap.
        </p>
      )}
    </main>
  )
}
// ================== PUZZLE 8 – MAZE GAME ==================
// ================== FIXED – NO SCROLLBARS, FULL VISIBILITY ==================
function PuzzleEight({ router }: any) {
  // ---------- BASE MAZE ----------
  const baseMaze = [
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]

  const GRID_ROWS = baseMaze.length
  const GRID_COLS = baseMaze[0].length

  const getStart = () => {
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if (baseMaze[r][c] === 2) return { row: r, col: c }
      }
    }
    return { row: 0, col: 0 }
  }

  const START = getStart()

  // ---------- STATE ----------
  const [maze, setMaze] = useState(baseMaze)
  const [playerPos, setPlayerPos] = useState(START)
  const [ghostPos, setGhostPos] = useState({ row: 7, col: 7 })
  const [solved, setSolved] = useState(false)
  const [message, setMessage] = useState("Find the light. Trust nothing.")
  const [timeLeft, setTimeLeft] = useState(90)
  const [showContinue, setShowContinue] = useState(false)
  const [steps, setSteps] = useState(0)

  const VISION = 2

  // ---------- HELPER: Check if exit is reachable ----------
  const isExitReachable = (currentMaze: number[][], player: { row: number; col: number }) => {
    const visited = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false))
    const queue = [{ row: player.row, col: player.col }]
    visited[player.row][player.col] = true

    while (queue.length) {
      const { row, col } = queue.shift()!
      if (currentMaze[row][col] === 3) return true

      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      for (const [dr, dc] of dirs) {
        const nr = row + dr
        const nc = col + dc
        if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS && !visited[nr][nc]) {
          if (currentMaze[nr][nc] !== 1) { // not a wall
            visited[nr][nc] = true
            queue.push({ row: nr, col: nc })
          }
        }
      }
    }
    return false
  }

  // ---------- RESET ----------
  const reset = (msg = "You failed.") => {
    setPlayerPos(START)
    setGhostPos({ row: 7, col: 7 })
    setTimeLeft(90)
    setSteps(0)
    setMessage(msg)
  }

  // ---------- TIMER ----------
  useEffect(() => {
    if (solved) return
    const t = setInterval(() => {
      setTimeLeft((v) => {
        if (v <= 1) {
          reset("⏳ Time collapsed.")
          return 90
        }
        return v - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [solved])

  // ---------- GHOST ----------
  useEffect(() => {
    if (solved) return
    const g = setInterval(() => {
      setGhostPos((p) => {
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
        const shuffled = [...dirs]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        for (const [dr, dc] of shuffled) {
          const nr = p.row + dr
          const nc = p.col + dc
          if (nr < 0 || nc < 0 || nr >= GRID_ROWS || nc >= GRID_COLS) continue
          if (maze[nr][nc] === 1 || maze[nr][nc] === 3) continue
          return { row: nr, col: nc }
        }
        return p
      })
    }, 1000)

    return () => clearInterval(g)
  }, [maze, solved])

  // ---------- SAFE MAZE SHIFT ----------
  useEffect(() => {
    if (steps > 0 && steps % 12 === 0 && !solved) {
      setMessage("🌀 The maze shifts...")
      setMaze((prevMaze) => {
        for (let attempt = 0; attempt < 3; attempt++) {
          const copy = prevMaze.map(row => [...row])
          for (let i = 0; i < 8; i++) {
            let r, c
            do {
              r = Math.floor(Math.random() * GRID_ROWS)
              c = Math.floor(Math.random() * GRID_COLS)
            } while (copy[r][c] === 2 || copy[r][c] === 3)
            if (copy[r][c] === 0) copy[r][c] = 1
            else if (copy[r][c] === 1) copy[r][c] = 0
          }
          if (isExitReachable(copy, playerPos)) {
            return copy
          }
        }
        setMessage("🌀 The maze resisted shifting...")
        return prevMaze
      })
    }
  }, [steps, solved, playerPos])

  // ---------- MOVE ----------
  const move = (dr: number, dc: number) => {
    if (solved) return

    const nr = playerPos.row + dr
    const nc = playerPos.col + dc

    if (nr < 0 || nc < 0 || nr >= GRID_ROWS || nc >= GRID_COLS) return

    if (maze[nr][nc] === 1) {
      reset("💥 The maze rejects you.")
      return
    }

    if (nr === ghostPos.row && nc === ghostPos.col) {
      reset("👻 The shadow consumed you.")
      return
    }

    setPlayerPos({ row: nr, col: nc })
    setSteps(s => s + 1)
    setMessage("")

    if (maze[nr][nc] === 3) {
      setSolved(true)
      setMessage("✨ Impossible… you escaped.")
      setTimeout(() => setShowContinue(true), 1500)
    }
  }

  // ---------- KEYBOARD ----------
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === "ArrowUp") move(-1, 0)
      if (e.key === "ArrowDown") move(1, 0)
      if (e.key === "ArrowLeft") move(0, -1)
      if (e.key === "ArrowRight") move(0, 1)
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  })

  // ---------- VISIBILITY: always show goal (value 3) ----------
  const visible = (r: number, c: number, cellValue: number) => {
    if (cellValue === 3) return true
    return Math.abs(r - playerPos.row) <= VISION && Math.abs(c - playerPos.col) <= VISION
  }

  const continueGame = () => {
    completePuzzle(8)
    router.push("/puzzles/9")
  }

  // Use smaller cells so the whole grid fits without scrolling
  const cellSize = 35 // px

  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center flex-shrink-0">
        <h1 className="text-3xl font-bold mb-1">IMPOSSIBLE MAZE</h1>
        <p className="text-red-400 mb-1 text-sm">{message}</p>
        <p className="text-gray-400 mb-3">⏳ {timeLeft}s</p>
      </div>

      {/* Maze container – no scrollbars, fits content */}
      <div className="flex-shrink-0">
        <div
          className="grid border-2 border-gray-700"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
          }}
        >
          {maze.map((row, r) =>
            row.map((cell, c) => {
              if (!visible(r, c, cell)) {
                return <div key={`${r}-${c}`} className="bg-black" style={{ width: cellSize, height: cellSize }} />
              }

              let bg = "bg-gray-900"
              let content = ""

              if (cell === 1) {
                bg = "bg-gray-700"
                content = "⬛"
              }
              if (cell === 3) {
                bg = "bg-yellow-900"
                content = "🌟"
              }

              if (r === ghostPos.row && c === ghostPos.col && !solved) {
                bg = "bg-red-700"
                content = "👻"
              }

              if (r === playerPos.row && c === playerPos.col) {
                bg = "bg-blue-600"
                content = "👤"
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center border border-black ${bg}`}
                  style={{ width: cellSize, height: cellSize, fontSize: cellSize * 0.7 }}
                >
                  {content}
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="flex-shrink-0 mt-6 grid grid-cols-3 gap-2">
        <div />
        <button onClick={() => move(-1, 0)} className="bg-gray-800 p-2 rounded text-xl">
          ⬆️
        </button>
        <div />
        <button onClick={() => move(0, -1)} className="bg-gray-800 p-2 rounded text-xl">
          ⬅️
        </button>
        <button onClick={() => move(1, 0)} className="bg-gray-800 p-2 rounded text-xl">
          ⬇️
        </button>
        <button onClick={() => move(0, 1)} className="bg-gray-800 p-2 rounded text-xl">
          ➡️
        </button>
      </div>

      {showContinue && (
        <button
          onClick={continueGame}
          className="mt-6 bg-green-600 px-6 py-2 rounded-lg animate-pulse font-bold"
        >
          Continue →
        </button>
      )}
    </main>
  )
}
function PuzzleNine({ router }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [collectedStars, setCollectedStars] = useState<boolean[]>([]);
  const [usernameChars, setUsernameChars] = useState<string[]>([]);
  const [allStarsCollected, setAllStarsCollected] = useState(false);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [answerInput, setAnswerInput] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [stars, setStars] = useState<
    Array<{
      question: string;
      answer: string;
      top: string;
      left: string;
      usernameIndex: number;
    }>
  >([]);
  const [emojiData, setEmojiData] = useState<{
    positions: Array<{ top: number; left: number }>;
    emojis: string[];
  } | null>(null);

  const targetUsername = "R3fl3ct!0nS3tsM3Fr".split("");

  const questionPool = [
    { q: "Name of the first Sticker I sent You?", a: "Laila" },
    { q: "Another word for Confusion", a: "conundrum" },
    { q: "Name of the second chapter?", a: "baagh" },
    { q: "Complete the sentence... I dont like you..(hint: see sticky notes)", a: "I Adore You" },
    { q: "Date: Flowers Biggest (Format DD/MM/YY)", a: "26/12/25" },
    { q: "What do you call me?", a: "Mian Jee" },
    { q: "I Love you holds the light of a (Chapter 2)", a: "Thousand Suns" },
    { q: "First dish she cooked for me (google spelling)", a: "shakshuka" },
    { q: "Hassaan ki(mehndi)", a: "Beghum" },
    { q: "The mountain _________ in awake of her smile", a: "crumbles" },
    { q: "Date: Salam ka Jawab waqai main Jaiz hai (Format DD/MM/YY)", a: "19/04/25" },
    { q: "Date: Baloon Sweet Creame (Format DD/MM/YY)", a: "23/05/25" },
    { q: "Date: Khala Niki Sweet Creame, Ghodi (Format DD/MM/YY)", a: "15/08/25" },
    { q: "Song you sang included in our Video (---_--_--)", a: "tum se hi" },
    { q: "Shop Name First Necklace (-------)", a: "Haroons" },
    { q: "Secret word for friends yan dusre log?", a: "Kabootar" },
    { q: "Most important thing in a relationship for my beghum", a: "respect" },
    { q: "Jinn kis kamre main hai? xD (------- ----)", a: "Drawing Room" },
  ];

  // Generate background emojis
  useEffect(() => {
    const emojiList = [
  // flowers
  "🌸", "🌼", "🌻", "🌺", "🌷", "🌹", "🌿", "🌱", "🌾", "🌳",
  // sloths
  "🦥",
  // alien
  "👽", "🛸", "👾", "🤖",
  // chocolate / sweets
  "🍫", "🍬", "🍭", "🍪", "🍩", "🍰", "🧁",
  // fist bump
  "👊", "🤜", "🤛",
  // boom / explosion
  "💥", "💣", "🔥", "💫",
  // sun, moon, light, stars
  "☀️", "🌞", "🌙", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "⭐", "🌟", "✨", "☄️", "💡", "🕯️", "🔆", "🔅"
];

    const positions = Array.from({ length: 120 }).map(() => ({
      top: Math.random() * 95,
      left: Math.random() * 95,
    }));

    const assignedEmojis = positions.map(() => 
      emojiList[Math.floor(Math.random() * emojiList.length)]
    );

    setEmojiData({ positions, emojis: assignedEmojis });
  }, []);

  // Generate stars
  useEffect(() => {
    const indices = Array.from({ length: 18 }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const positions = Array.from({ length: 18 }).map((_, i) => {
      let top, left;
      do {
        top = Math.random() * 80 + 10;
        left = Math.random() * 80 + 10;
      } while (top > 35 && top < 65 && left > 35 && left < 65);
      const qa = questionPool[i % questionPool.length];
      return {
        question: qa.q,
        answer: qa.a,
        top: `${top}%`,
        left: `${left}%`,
        usernameIndex: indices[i],
      };
    });
    setStars(positions);
    setCollectedStars(new Array(18).fill(false));
    setUsernameChars(new Array(18).fill("_"));
  }, []);

  // Mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check all stars collected
  useEffect(() => {
    if (collectedStars.every(Boolean)) {
      setAllStarsCollected(true);
    }
  }, [collectedStars]);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveStar(null);
      setAnswerInput("");
      setAnswerError("");
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleStarClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (collectedStars[index]) return;
    setActiveStar(index);
    setAnswerInput("");
    setAnswerError("");
  };

  const handleAnswerSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const star = stars[index];
    if (answerInput.trim().toLowerCase() === star.answer.toLowerCase()) {
      const newCollected = [...collectedStars];
      newCollected[index] = true;
      setCollectedStars(newCollected);

      const newUsernameChars = [...usernameChars];
      newUsernameChars[star.usernameIndex] = targetUsername[star.usernameIndex];
      setUsernameChars(newUsernameChars);

      setActiveStar(null);
      setAnswerInput("");
      setAnswerError("");
    } else {
      setAnswerError("Incorrect answer. Try again.");
    }
  };

  const handleLogin = () => {
    if (!allStarsCollected) {
      setError("You must find and answer all 18 stars first.");
      return;
    }
    if (password.toLowerCase() === "found") {
      completePuzzle(9);
      router.push("/reveal");
    } else {
      setError("Invalid password. The light rejects you.");
    }
  };

  const isStarNearMouse = (star: { top: string; left: string }) => {
    const starX = (parseFloat(star.left) / 100) * window.innerWidth;
    const starY = (parseFloat(star.top) / 100) * window.innerHeight;
    const dist = Math.hypot(mousePos.x - starX, mousePos.y - starY);
    return dist < 150;
  };

  return (
    <main className="relative h-screen bg-black text-white overflow-hidden cursor-none">
      {/* Torch overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,1) 100%)`,
        }}
      />

      {/* Background emojis */}
      {emojiData && emojiData.positions.map((pos, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-2xl select-none"
          style={{
            top: pos.top + "%",
            left: pos.left + "%",
            zIndex: 0,
            opacity: 0.3,
          }}
        >
          {emojiData.emojis[i]}
        </div>
      ))}

      {/* Stars */}
      {stars.map((star, i) => {
        const near = isStarNearMouse(star);
        const collected = collectedStars[i];
        if (!near && !collected) return null;

        return (
          <div
            key={i}
            onClick={(e) => handleStarClick(e, i)}
            className={`absolute text-3xl transition-all duration-300 cursor-pointer ${
              collected ? "text-yellow-400" : "text-white"
            }`}
            style={{
              top: star.top,
              left: star.left,
              opacity: collected ? 1 : near ? 1 : 0,
              transform: collected ? "scale(1.2)" : "scale(1)",
              zIndex: 50,
            }}
          >
            {collected ? "⭐" : "⭐"}
          </div>
        );
      })}

      {/* Question popup */}
      {activeStar !== null && (
        <div
          className="absolute z-60 bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-xl"
          style={{
            top: stars[activeStar].top,
            left: stars[activeStar].left,
            transform: "translate(20px, -50%)",
            zIndex: 60,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white mb-2">{stars[activeStar].question}</p>
          <form onSubmit={(e) => handleAnswerSubmit(e, activeStar)}>
            <input
              autoFocus
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              className="bg-black border border-gray-700 p-2 rounded w-full text-white"
            />
            {answerError && <p className="text-red-400 text-sm mt-1">{answerError}</p>}
            <button
              type="submit"
              className="mt-2 bg-white text-black px-4 py-2 rounded w-full font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Login form */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 p-8 rounded-lg border border-gray-700 w-96 backdrop-blur-sm"
        style={{ zIndex: 40 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Final Gate</h1>
        <p className="text-gray-400 mb-6 text-center">
          Find the 18 stars and answer their questions to reveal the username.
        </p>

        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Username (revealed):</div>
          <div className="flex flex-wrap justify-center gap-1">
            {usernameChars.map((char, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-800 border border-gray-600 flex items-center justify-center text-lg font-bold"
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center">
          <div className="text-sm text-gray-500">Stars collected:</div>
          <div className="text-2xl font-bold">
            {collectedStars.filter(Boolean).length} / 18
          </div>
          {allStarsCollected && (
            <p className="text-green-400 mt-2">All stars collected! Enter the password.</p>
          )}
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white"
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-black p-3 rounded font-bold hover:bg-gray-200"
        >
          Unlock
        </button>
      </div>

      {/* Dev skip button */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => {
            completePuzzle(9);
            router.push("/reveal");
          }}
          className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
        >
          ⏭️ Skip (Dev)
        </button>
      )}
    </main>
  );
}