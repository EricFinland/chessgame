import React from 'react';
import { motion } from 'framer-motion';
import { getRandomAnimation } from '../utils/randomizer';
import { pawnAnimations } from '../animations/pawnAnimations';
import { knightAnimations } from '../animations/knightAnimations';
import { bishopAnimations } from '../animations/bishopAnimations';
import { rookAnimations } from '../animations/rookAnimations';
import { queenAnimations } from '../animations/queenAnimations';
import { kingAnimations } from '../animations/kingAnimations';

const animationMap: Record<string, string[]> = {
  pawn: pawnAnimations,
  knight: knightAnimations,
  bishop: bishopAnimations,
  rook: rookAnimations,
  queen: queenAnimations,
  king: kingAnimations,
};

export interface PieceProps {
  type: string;
  color: string;
  isAnimating: boolean;
}

export const Piece: React.FC<PieceProps> = ({ type, color, isAnimating }) => {
  const animationIdx = isAnimating ? Math.floor(Math.random() * 5) : 0;
  const pieceSymbols: Record<string, { w: string; b: string }> = {
    pawn:   { w: '♙', b: '♟' },
    knight: { w: '♘', b: '♞' },
    bishop: { w: '♗', b: '♝' },
    rook:   { w: '♖', b: '♜' },
    queen:  { w: '♕', b: '♛' },
    king:   { w: '♔', b: '♚' },
  };
  const symbol = pieceSymbols[type]?.[color[0]] || '?';

  const pieceAnimations: Record<string, any[]> = {
    pawn: [
      { y: [0, -20, 0] },
      { rotate: [0, 360, 0] },
      { scale: [1, 2, 1] },
      { x: [0, 10, -10, 0] },
      { opacity: [1, 0.2, 1] },
    ],
    knight: [
      { x: [0, 30, 0] },
      { rotate: [0, 45, -45, 0] },
      { y: [0, -30, 0] },
      { scale: [1, 1.5, 1] },
      { x: [0, -30, 0] },
    ],
    bishop: [
      { rotate: [0, 180, 0] },
      { y: [0, -15, 0] },
      { scale: [1, 1.3, 1] },
      { x: [0, 15, -15, 0] },
      { opacity: [1, 0.5, 1] },
    ],
    rook: [
      { x: [0, 40, 0] },
      { scale: [1, 1.2, 1] },
      { rotate: [0, 90, 0] },
      { y: [0, -10, 0] },
      { opacity: [1, 0.3, 1] },
    ],
    queen: [
      { scale: [1, 1.7, 1] },
      { rotate: [0, 360, 0] },
      { x: [0, 20, -20, 0] },
      { y: [0, -25, 0] },
      { opacity: [1, 0.6, 1] },
    ],
    king: [
      { scale: [1, 2, 1] },
      { rotate: [0, 360, 0] },
      { x: [0, 15, -15, 0] },
      { y: [0, -20, 0] },
      { opacity: [1, 0.4, 1] },
    ],
  };

  const anim = isAnimating ? pieceAnimations[type][animationIdx] : {};

  return (
    <motion.div
      animate={anim}
      transition={{ duration: 0.7 }}
      style={{ fontSize: '2em', textAlign: 'center', lineHeight: '50px' }}
    >
      <span>{symbol}</span>
    </motion.div>
  );
};
