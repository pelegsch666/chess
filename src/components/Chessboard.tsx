import { useRef } from 'react';
import './Chessboard.css';
import Tile from './Tile/Tile';
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? 'b' : 'w';
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
  pieces.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
  pieces.push({ image: `assets/images/bishop_${type}.png`, x: 2, y });
  pieces.push({ image: `assets/images/bishop_${type}.png`, x: 5, y });
  pieces.push({ image: `assets/images/knight_${type}.png`, x: 1, y });
  pieces.push({ image: `assets/images/knight_${type}.png`, x: 6, y });
  pieces.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
  pieces.push({ image: `assets/images/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: 'assets/images/pawn_b.png', x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: 'assets/images/pawn_w.png', x: i, y: 1 });
}

const Chessboard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);
  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    if (element.classList.contains('chess-piece')) {
      console.log(e);

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth;
      const maxY = chessboard.offsetTop + chessboard.clientHeight;
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.position = 'absolute';

      activePiece.style.left = x < minX ? `${minX}px` : `${x}px`;
      activePiece.style.top = y < minY ? `${minY}px` : `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;
      pieces.forEach(p => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(
        <Tile
          key={`${j},${i}`}
          image={image}
          number={number}></Tile>
      );
    }
  }
  return (
    <div
      onMouseMove={e => movePiece(e)}
      onMouseDown={e => grabPiece(e)}
      onMouseUp={e => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}>
      {board}
    </div>
  );
};

export default Chessboard;
