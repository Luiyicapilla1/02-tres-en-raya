import { useState } from "react";
import Cell from "../cell/cell";
import "./gameBoard.css";

export default function GameBoard() {
  const turns = {
    x: "x",
    o: "o",
  };

  //States
  const [turn, setTurn] = useState(turns.x);
  const [cell_list, setCell_list] = useState(Array(9).fill(null));

  const turnChanger = (): void => {
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);
  };

  const cellsListChanger = (index: number): void => {
    if (cell_list[index] !== null) return;
    const litsUpdated: string[] = [...cell_list];
    litsUpdated[index] = turn;
    setCell_list(litsUpdated);
    turnChanger();
  };

  return (
    <>
      <main className="board">
        {cell_list.map((_, index) => (
          <Cell key={index} turnChanger={cellsListChanger} index={index}>
            {cell_list[index]}
          </Cell>
        ))}
      </main>
      <section className="turnSection">
        <aside className={turn === turns.x ? "active-x-turn turn" : "turn"}>
          {turns.x}
        </aside>
        <aside className={turn === turns.o ? "active-o-turn turn" : "turn"}>
          {turns.o}
        </aside>
      </section>
    </>
  );
}
