import * as React from 'react';
import * as style from './style.less';

const enum Player {
   None = 0,
   One,
   Two
}

type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

export namespace TicTacToe {
   export interface State {
      board: Player[];
      nextPlayerTurn: Player;
      gameIsWon: Player | ONGOING_GAME;
   }
}

export default class TicTacToe extends React.Component<{}, TicTacToe.State> {
   state: TicTacToe.State = {
      board: [
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None,
         Player.None
      ],
      nextPlayerTurn: Player.One,
      gameIsWon: ONGOING_GAME
   };

   checkIfGameIsOver = (board: Player[]): Player => {
      if (board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) {
         return board[0];
      } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) {
         return board[3];
      } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) {
         return board[6];
      } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None) {
         return board[0];
      } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None) {
         return board[1];
      } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None) {
         return board[2];
      } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None) {
         return board[0];
      } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None) {
         return board[2];
      }

      for (const player of board) {
         if (player === Player.None) {
            return ONGOING_GAME;
         }
      }

      return Player.None;
   };

   createOnClickHandler = (index: number) => () => {
      const { board, nextPlayerTurn, gameIsWon } = this.state;
      const newBoard = board.slice();

      if (gameIsWon !== ONGOING_GAME || newBoard[index] !== Player.None) {
         return;
      }

      newBoard[index] = nextPlayerTurn;
      const newGameIsWon = this.checkIfGameIsOver(newBoard);

      this.setState({
         board: newBoard,
         nextPlayerTurn: 3 - nextPlayerTurn,
         gameIsWon: newGameIsWon
      });
   };

   renderCell = (index: number) => {
      const { board } = this.state;

      return (
         <div
            id={`cell${index}`}
            className={style.cell}
            key={index}
            onClick={this.createOnClickHandler(index)}
            data-player={board[index]}
         />
      );
   };

   renderStatus = () => {
      const { gameIsWon } = this.state;

      const winningText =
         gameIsWon !== Player.None ? `Player ${gameIsWon} won` : 'The game is a draw';

      return (
         <div id="status" className={style.status}>
            {'player 1 is green'} <br />
            {'player 2 is red'} <br />
            {gameIsWon === ONGOING_GAME ? 'game is ongoing' : winningText}
         </div>
      );
   };

   renderBoard = () => {
      const { board } = this.state;
      return (
         <div className={style.board_container}>
            {board.map((value, key) => this.renderCell(key))}
         </div>
      );
   };

   render() {
      return (
         <div>
            {this.renderBoard()}
            {this.renderStatus()}
         </div>
      );
   }
}
