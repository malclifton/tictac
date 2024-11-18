import React, {useState, useEffect} from "react";
import GameGrid from "./GameGrid.js";
// TODO: Import useState() hook


function Game() {

   // TODO: Replace variables with state variables
   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   //extra features
   const [gameOver, setGameOver] = useState(false);
   const [winner, setWinner] = useState(null);

   //tile combos that can win
   const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0,3,6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], 
   ];

   // winner or tie ?
   const checkGameOver = (board) => {
      //winner winner
      for (const combo of winCombos) {
         const [a, b, c] = combo;
         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setGameOver(true);
            setWinner(board[a]);
            return;
         }
      }
      //tie
      if (board.every((square) => square !== "")) {
         setGameOver(true);
         setWinner("Tie");
      }
   };

   const computerMove = () => {
      if (gameOver) return;
      const board = [...moves]; //copy board
      //check winning combos
      for (const combo of winCombos) {
         const [a, b, c] = combo;
         if (
            board[a] === "O" &&
            board[b] === "O" &&
            board[c] === ""
         ) {
            board[c] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
         if (
            board[a] === "O" &&
            board[c] === "O" &&
            board[b] === ""
         ) {
            board[b] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
         if (
            board[b] === "O" &&
            board[c] === "O" &&
            board[a] === ""
         ) {
            board[a] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
      }
      //block tiles
      for (const combo of winCombos) {
         const [a, b, c] = combo;
         if (
            board[a] === "X" &&
            board[b] === "X" &&
            board[c] === ""
         ) {
            board[c] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
         if (
            board[a] === "X" &&
            board[c] === "X" &&
            board[b] === ""
         ) {
            board[b] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
         if (
            board[b] === "X" &&
            board[c] === "X" &&
            board[a] === ""
         ) {
            board[a] = "O";
            setMoves(board);
            setTurn("X");
            return;
         }
      }
      //randomize moves
      const availableSpots = board.map((square, index) => (square === "" ? index : null)).filter((index) => index !== null);
      if (availableSpots.length > 0) {
         const randomIndex = Math.floor(Math.random() * availableSpots.length);
         board[availableSpots[randomIndex]] = "O";
         setMoves(board);
         setTurn("X");
      }
   };
  
   function gridClick(whichSquare) {
      // TODO: Replace with code to set the move and turn
      if (gameOver || moves[whichSquare] !== "") return; //cannot play if game over or all tiles filled
         const movesCopy = [...moves]; //copy moves array
         movesCopy[whichSquare] = "X"; //user turn
         setMoves(movesCopy); //update state 
         setTurn("O") //switch to computer 
   }
   // TODO: Add newGame() function here
   function newGame() {
      //reset game state
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setGameOver(false);
      setWinner(null);
   }
   //trigger computer move
useEffect(() => {
      checkGameOver(moves);
      if (turn === "O" && !gameOver) {
         setTimeout(computerMove, 200); 
      }
   }, [moves, turn]);

   // TODO: Make New Game button to call newGame() when clicked
   return (
      <>
         <h1>Tic-Tac-Toe</h1>        
         <GameGrid moves={moves} click={gridClick} />
         <p>
            {gameOver ? (
               winner === "Tie" ? (
                  "It's a tie!"
               ) : (
                  `Winner: ${winner}`
               )
            ) : (
               <>
                  Turn: <strong className={turn}>{turn}</strong>
               </>
            )}
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;