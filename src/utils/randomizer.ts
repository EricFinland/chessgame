export function getRandomAnimation(animations: string[]): string {
  const idx = Math.floor(Math.random() * animations.length);
  return animations[idx];
}
