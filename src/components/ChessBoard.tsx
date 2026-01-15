import React, { useState } from 'react';
import { getInitialBoard } from '../utils/chessLogic';
import type { Piece, PieceType, Color, Board } from '../utils/chessLogic';
import { Piece as ChessPiece } from './Piece';

export const ChessBoard: React.FC = () => {
  const [board, setBoard] = useState(getInitialBoard());
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);
  const [turn, setTurn] = useState<Color>('white');
  const [animatingSquares, setAnimatingSquares] = useState<{row: number, col: number}[]>([]);
  const [validMoves, setValidMoves] = useState<{row: number, col: number}[]>([]);

  // Basic move validation (pawn, knight, bishop, rook, queen, king)
  function getValidMoves(row: number, col: number, piece: Piece, board: Board): {row: number, col: number}[] {
    const moves: {row: number, col: number}[] = [];
    const directions: Record<PieceType, number[][]> = {
      pawn: piece.color === 'white' ? [[-1,0]] : [[1,0]],
      knight: [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],
      bishop: [[-1,-1],[-1,1],[1,-1],[1,1]],
      rook: [[-1,0],[1,0],[0,-1],[0,1]],
      queen: [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]],
      king: [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]],
    };
    if (piece.type === 'pawn') {
      const dir = piece.color === 'white' ? -1 : 1;
      // Forward move
      if (board[row+dir] && board[row+dir][col] === null) {
        moves.push({row: row+dir, col});
        // Double move from start
        if ((piece.color === 'white' && row === 6) || (piece.color === 'black' && row === 1)) {
          if (board[row+2*dir] && board[row+2*dir][col] === null) {
            moves.push({row: row+2*dir, col});
          }
        }
      }
      // Captures
      for (const dc of [-1,1]) {
        if (board[row+dir] && board[row+dir][col+dc] && board[row+dir][col+dc]?.color !== piece.color && board[row+dir][col+dc] !== null) {
          moves.push({row: row+dir, col: col+dc});
        }
      }
    } else if (piece.type === 'knight') {
      for (const [dr,dc] of directions.knight) {
        const r = row+dr, c = col+dc;
        if (board[r] && board[r][c] && board[r][c]?.color !== piece.color || (board[r] && board[r][c] === null)) {
          if (r>=0 && r<8 && c>=0 && c<8 && (!board[r][c] || board[r][c]?.color !== piece.color)) moves.push({row:r,col:c});
        }
      }
    } else if (piece.type === 'bishop' || piece.type === 'rook' || piece.type === 'queen') {
      const dirs = directions[piece.type];
      for (const [dr,dc] of dirs) {
        for (let i=1; i<8; i++) {
          const r = row+dr*i, c = col+dc*i;
          if (r<0||r>7||c<0||c>7) break;
          if (board[r][c] === null) moves.push({row:r,col:c});
          else {
            if (board[r][c]?.color !== piece.color) moves.push({row:r,col:c});
            break;
          }
        }
      }
    } else if (piece.type === 'king') {
      for (const [dr,dc] of directions.king) {
        const r = row+dr, c = col+dc;
        if (r>=0 && r<8 && c>=0 && c<8 && (!board[r][c] || board[r][c]?.color !== piece.color)) moves.push({row:r,col:c});
      }
    }
    return moves;
  }

  function handleSquareClick(row: number, col: number) {
    if (turn !== 'white') return; // Only allow player to move white
    if (selected) {
      // Try to move
      if (validMoves.some(m => m.row === row && m.col === col)) {
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = board[selected.row][selected.col];
        newBoard[selected.row][selected.col] = null;
        setBoard(newBoard);
        setSelected(null);
        setValidMoves([]);
        setAnimatingSquares([{ row, col }]);
        setTimeout(() => setAnimatingSquares([]), 700);
        setTurn('black');
        setTimeout(() => botMove(newBoard), 800);
        return;
      } else {
        setSelected(null);
        setValidMoves([]);
        return;
      }
    }
    const piece = board[row][col];
    if (piece && piece.color === turn) {
      setSelected({ row, col });
      setValidMoves(getValidMoves(row, col, piece, board));
    }
  }

  // Simple bot: picks a random valid move for black
  function botMove(board: Board) {
    // Find all black pieces and their moves
    const moves: {from: {row:number,col:number}, to: {row:number,col:number}}[] = [];
    for (let r=0; r<8; r++) {
      for (let c=0; c<8; c++) {
        const piece = board[r][c];
        if (piece && piece.color === 'black') {
          const valid = getValidMoves(r, c, piece, board);
          for (const move of valid) {
            moves.push({ from: {row:r,col:c}, to: move });
          }
        }
      }
    }
    if (moves.length === 0) return;
    const pick = moves[Math.floor(Math.random()*moves.length)];
    const newBoard = board.map(r => r.slice());
    newBoard[pick.to.row][pick.to.col] = board[pick.from.row][pick.from.col];
    newBoard[pick.from.row][pick.from.col] = null;
    setBoard(newBoard);
    setAnimatingSquares([{ row: pick.to.row, col: pick.to.col }]);
    setTimeout(() => setAnimatingSquares([]), 700);
    setTurn('white');
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 50px)',
      gap: 0,
      border: '3px solid #333',
      background: '#222',
      width: 'fit-content',
      margin: '20px auto'
    }}>
      {board.map((rowArr, rowIdx) =>
        rowArr.map((piece, colIdx) => {
          const isSelected = selected && selected.row === rowIdx && selected.col === colIdx;
          const isValid = validMoves.some(m => m.row === rowIdx && m.col === colIdx);
          // Classic chess colors
          const lightSquare = '#f0d9b5';
          const darkSquare = '#b58863';
          const selectedSquare = '#ffe066';
          const validMoveSquare = '#7fffd4';
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              style={{
                width: 50,
                height: 50,
                background: isSelected ? selectedSquare : isValid ? validMoveSquare : (rowIdx + colIdx) % 2 === 0 ? lightSquare : darkSquare,
                border: '1px solid #555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: piece && piece.color === turn ? 'pointer' : isValid ? 'pointer' : 'default',
                boxSizing: 'border-box'
              }}
              onClick={() => handleSquareClick(rowIdx, colIdx)}
            >
              {piece && (
                <ChessPiece
                  type={piece.type}
                  color={piece.color}
                  isAnimating={animatingSquares.some(sq => sq.row === rowIdx && sq.col === colIdx)}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
