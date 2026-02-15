import "./cell.css";

export default function Cell({
  children,
  turnChanger,
  index,
}: {
  children: string;
  turnChanger: (index: number) => void;
  index: number;
}) {
  const clickHandler = () => {
    turnChanger(index);
  };

  return (
    <div className="board-cell">
      <button
        onClick={clickHandler}
        className={children === "x" ? "active-x-turn" : "active-o-turn"}
      >
        {children}
      </button>
    </div>
  );
}
