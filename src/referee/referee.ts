import { PieceType, TeamType } from '../components/Chessboard';

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log(
      `prev: ${px},${py} next: ${x},${y} type: ${type} tean: ${team}`
    );

    if (type === PieceType.PAWN) {
      if (team === TeamType.OURTEAM) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            console.log('valid move');
            return true;
          }
        } else {
          if (px === x && y - py === 1) {
            console.log('valid move');
            return true;
          }
        }
      } else {
        if (py === 6) {
          if ((px === x && y - py === -1) || y - py === -2) {
            console.log('valid move');
            return true;
          }
        } else {
          if (px === x && y - py === -1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
