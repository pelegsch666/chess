import './Chessboard.css';
import Tile from './Tile/Tile';
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const Chessboard = () => {
  const board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      if (number % 2 === 0) {
        board.push(<Tile number={number}/>);
      } else {
        board.push(<Tile number={number}/>);
      }
    }
  }
  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
