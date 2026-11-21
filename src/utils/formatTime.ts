/** Formats a duration in seconds as mm:ss. */
export const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
