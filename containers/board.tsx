import { useEffect, useState } from "react";
import Square from '../components/Squares';
type Player = 'X' | 'O' | 'Both' | null;
function calculateWinner(Squares: Player[]) {
    const Lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < Lines.length; i++) {
        const [a, b, c] = Lines[i];
        if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
            return Squares[a];
        }
    }
}

function Board() {
    const [Squares, setSquares] = useState(Array(9).fill(null));
    const [CurrentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
    const [winner, setWinner] = useState<Player>(null);
    function setSquareValue(ind: number) {
        const newData = Squares.map((val, i) => {
            if (i === ind) {
                return CurrentPlayer;
            }
            return val;
        });
        setSquares(newData);
        setCurrentPlayer(CurrentPlayer === 'X' ? 'O' : 'X');
    }
    function resetValues() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
    }
    useEffect(() => {
        const w = calculateWinner(Squares);
        if (w) {
            setWinner(w);
        }
        if (!w && !Squares.filter((Square) => !Square).length) {
            setWinner('Both');
        }
    })
    return (
        <div>
            {!winner ? <p>Player {CurrentPlayer} Turn</p> : <></>}
            {winner ? <p>{winner} Won the Match</p> : <></>}
            <div className="grid">
                {Array(9).fill(null).map((_, i) => {
                    return <Square key={i} onClick={() => setSquareValue(i)} winner={winner} value={Squares[i]} />
                })}
            </div>
            <div><button className="reset" onClick={() => resetValues()}>Reset</button></div>
        </div>
    )
}
export default Board;