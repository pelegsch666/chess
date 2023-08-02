import { PieceType, TeamType, Piece } from '../components/Chessboard';

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }
  TileIsOccupiedByOpponent(
    x: number,
    y: number,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y);
    if (piece && piece.team !== team) {
      return true;
    } else {
      return false;
    }
  }
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log(
      `prev: ${px},${py} next: ${x},${y} type: ${type} tean: ${team}`
    );
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OURTEAM ? 1 : 6;
      const pawnDirection = team === TeamType.OURTEAM ? 1 : -1;
      // movement logic
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
      // Attack Logic
      else if (x - px === -1 && y - py === pawnDirection) {
        //Attack in upper or bottom left
        console.log('Attack in upper or bottom left');
        if(!this.TileIsOccupiedByOpponent(x, y, team, boardState)){
         console.log('We can strike the enemy')
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        //Attack in upper or bottom right
        console.log('Attack in upper or bottom right');
      }
    }

    return false;
  }
}
