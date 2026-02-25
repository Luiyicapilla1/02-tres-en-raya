import { useState } from "react";
import Cell from "../cell/cell";
import "./gameBoard.css";

export default function GameBoard() {
  const turns = {
    x: "x",
    o: "o",
  };
  const win_options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //States
  const [turn, setTurn] = useState(turns.x);
  const [winner, setWinner] = useState("");
  const [cell_list, setCell_list] = useState(Array(9).fill(null));

  const verify_winner = (litsUpdated: string[]) => {
    for (const option of win_options) {
      const [a, b, c] = option;
      if (
        litsUpdated[a] !== null &&
        litsUpdated[b] === litsUpdated[a] &&
        litsUpdated[c] === litsUpdated[a]
      ) {
        setWinner(turn);
        return;
      }
    }
  };

  const turnChanger = (): void => {
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);
  };

  const cellsListChanger = (index: number): void => {
    if (cell_list[index] !== null || winner !== "") return;
    const litsUpdated: string[] = [...cell_list];
    litsUpdated[index] = turn;
    setCell_list(litsUpdated);
    verify_winner(litsUpdated);
    turnChanger();
  };

  const newGame = () => {
    setTurn(turns.x);
    setWinner("");
    setCell_list(Array(9).fill(null));
  };

  const winnerButtonHandler = () => {
    newGame();
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
      {winner !== "" ? (
        <section className="winner_modal">
          <article>
            <h1>{winner !== "" && winner}</h1>
            <button onClick={winnerButtonHandler}>Volver a Jugar</button>
          </article>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
