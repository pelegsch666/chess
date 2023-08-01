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

      if (py === specialRow) {
        if (px === x && y - py === 2 * pawnDirection) {
          if (
            !this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupied(x, y - pawnDirection, boardState)
          ) {
            return true;
          }
        }
      } else if (px === x && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else {
        if (px === x && y - py === pawnDirection) {
          if (!this.tileIsOccupied(x, y, boardState)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
