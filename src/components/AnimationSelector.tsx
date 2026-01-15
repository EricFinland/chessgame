// This component is a placeholder for future animation asset selection
// For now, it just displays the animation name
import React from 'react';

export const AnimationSelector: React.FC<{ animation: string }> = ({ animation }) => {
  return <div style={{ fontSize: '0.8em', color: 'purple' }}>{animation}</div>;
};
