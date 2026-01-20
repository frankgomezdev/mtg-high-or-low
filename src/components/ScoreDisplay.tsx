interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="text-center">
      <span className="text-gray-400 text-sm uppercase tracking-wider">Score</span>
      <div className="text-4xl font-bold text-white">{score}</div>
    </div>
  );
}
