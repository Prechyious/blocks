"use client";

import { useState } from "react";

interface Wall {
  name: string;
  length: number;
  height: number;
  openings: number;
  blockFactor: number;
}

export default function Home() {
  const [walls, setWalls] = useState<Wall[]>([]);
  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [openings, setOpenings] = useState("");
  const [blockSize, setBlockSize] = useState("13");
  const [result, setResult] = useState("");

  const addWall = () => {
    if (!name || !length || !height) return;

    setWalls([
      ...walls,
      {
        name,
        length: parseFloat(length),
        height: parseFloat(height),
        openings: parseFloat(openings),
        blockFactor: parseInt(blockSize),
      },
    ]);

    setName("");
    setLength("");
    setHeight("");
    setOpenings("0");
    setBlockSize("13");

    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const calculateBlocks = () => {
    let total = 0;

    walls.forEach((wall) => {
      const area = wall.length * wall.height - wall.openings;
      const blocks = area * wall.blockFactor;
      const blocksWithWastage = Math.ceil(blocks * 1.05);
      total += blocksWithWastage;
    });

    setResult(`TOTAL: ${total} blocks (incl. 5% wastage)`);
  };

  const downloadResults = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "block-calculation.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-6 text-slate-700">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Wall Block Calculator
        </h2>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center text-slate-800">
              Add Wall
            </h3>

            <div className="space-y-3">
              <div>
                <label className="font-medium">Wall Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. Living Room Wall"
                />
              </div>

              <div>
                <label className="font-medium">Length (m):</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <label className="font-medium">Height (m):</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 50"
                />
              </div>

              <div>
                <label className="font-medium">
                  Openings (windows,doors, lintels, etc. in m²):
                </label>
                <input
                  type="number"
                  value={openings}
                  onChange={(e) => setOpenings(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 0.5"
                />
              </div>

              <div>
                <label className="font-medium">Block Size:</label>
                <select
                  value={blockSize}
                  onChange={(e) => setBlockSize(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="13">150mm (6 inches)</option>
                  <option value="10">225mm (9 inches)</option>
                </select>
              </div>

              <button
                onClick={addWall}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Add Wall
              </button>
            </div>
          </div>

          {/* Results */}
          <div
            id="results"
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Results</h3>

            <div className="flex-1">
              <strong className="block mb-2">Walls:</strong>
              <ul className="space-y-1 text-gray-700 list-disc pl-5 overflow-y-auto">
                {walls.map((wall, i) => (
                  <li key={i}>
                    {wall.name} → {wall.length}m × {wall.height}m -{" "}
                    {wall.openings}m²
                  </li>
                ))}
              </ul>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md whitespace-pre-line">
                {result}
              </div>
            )}

            <div className="mt-4 space-y-2">
              <button
                onClick={calculateBlocks}
                className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
              >
                Calculate Blocks
              </button>

              <button
                onClick={downloadResults}
                className="w-full bg-gray-700 text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
              >
                Download Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
