/**
 * Converts seconds to a formatted time string (MM:SS or HH:MM:SS)
 * @param seconds - The number of seconds to format
 * @returns A formatted time string
 */
const secondsToFormattedString = (seconds: number): string => {
  // Calculate hours, minutes, seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60).toString().padStart(2, '0');

  if (hours === 0) {
    return `${minutes}:${secs}`;
  } else {
    const mins = minutes.toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  }
};

export { secondsToFormattedString };
