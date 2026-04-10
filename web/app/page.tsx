import { promises as fs } from "fs";
import path from "path";
import { DigestData } from "./types";
import TheoryCard from "./components/TheoryCard";
import Header from "./components/Header";

async function getData(): Promise<DigestData> {
  const filePath = path.join(process.cwd(), "public", "data", "latest.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export const revalidate = 0;

export default async function Home() {
  const data = await getData();
  const theories = data.theories ?? [];

  return (
    <main className="min-h-screen bg-[#E9E5DC] text-[#1C1A17]">
      <Header data={data} />

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-4">
        {theories.length === 0 ? (
          <div className="text-center text-zinc-500 py-24 text-sm">
            No data yet — run{" "}
            <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
              python3 run.py
            </code>{" "}
            to generate the first digest.
          </div>
        ) : (
          theories.map((theory, i) => (
            <TheoryCard key={i} theory={theory} rank={i + 1} />
          ))
        )}
      </div>
    </main>
  );
}
