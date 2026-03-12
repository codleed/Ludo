const PIP_LAYOUT: Record<number, string[]> = {
  1: ["center"],
  2: ["top-left", "bottom-right"],
  3: ["top-left", "center", "bottom-right"],
  4: ["top-left", "top-right", "bottom-left", "bottom-right"],
  5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
};

const PIP_CLASS: Record<string, string> = {
  center: "col-start-2 row-start-2",
  "top-left": "col-start-1 row-start-1",
  "top-right": "col-start-3 row-start-1",
  "middle-left": "col-start-1 row-start-2",
  "middle-right": "col-start-3 row-start-2",
  "bottom-left": "col-start-1 row-start-3",
  "bottom-right": "col-start-3 row-start-3",
};

interface DieProps {
  value: number;
  dimmed?: boolean;
  rolling?: boolean;
}

export const Die = ({ value, dimmed = false, rolling = false }: DieProps) => (
  <div
    className={`grid size-16 grid-cols-3 grid-rows-3 rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-lg ${
      dimmed ? "opacity-40" : ""
    } ${rolling ? "animate-spin" : ""}`}
  >
    {(PIP_LAYOUT[value] ?? []).map((pip) => (
      <span
        key={pip}
        className={`${PIP_CLASS[pip]} m-auto size-2.5 rounded-full bg-orange-500`}
      />
    ))}
  </div>
);
