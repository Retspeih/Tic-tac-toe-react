import React, {useState} from 'react';
import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';

const App = () => {

    const WIN = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const [board, setBoard] = useState(Array(9).fill(null));
    
    // Keeps track of who is playing currently, 'X' or 'O'
    const [player, setPlayer] = useState(true);

    const [score, setScore] = useState({xScore: 0, oScore: 0})

    const [gameOver, setGameOver] = useState(false);

    const handleBoxClick = (boxIndex) => {
        const updatedBoard = board.map((value, index) => {
            if (index === boxIndex) {
                return player === true ? "X" : "O";
            } else {
                return value;
            }
        });

        const winner = winCheck(updatedBoard);

        if(winner) {
            if(winner === 'O') {
                let {oScore} = score;
                oScore++;
                setScore({...score, oScore})
            } else {
                let {xScore} = score;
                xScore++;
                setScore({...score, xScore})
            }
        }

        setBoard(updatedBoard);

        setPlayer(!player);
    }

    const winCheck = (board) => {
        for(let i = 0; i < WIN.length; i++) {
            const [x, y, z] = WIN[i];

            if (board[x] && board[x] === board[y] && board[y] === board[z]) {
                setGameOver(true);
                return board[x];
            }
        }
    }

    const reset = () => {
        setGameOver(false);
        setBoard(Array(9).fill(null));
        setPlayer(true);
    }

    return (
        <div>
            <ScoreBoard score={score} player={player}/>
            <Board board={board} onClick={gameOver ? reset : handleBoxClick}/>
            <ResetButton reset={reset} />
        </div>
    )
}

export default App;