/**
 * Calculate total animation duration for a given text based on character count
 * @param text The text to animate
 * @param speed The speed of animation per character in milliseconds
 * @param startDelay Initial delay before animation starts in milliseconds
 * @returns Total animation duration in milliseconds
 */
export function calculateAnimationDuration(
  text: string,
  speed = 100,
  startDelay = 200
): number {
  const totalChars = text.split("").length;
  return startDelay + totalChars * speed;
} 