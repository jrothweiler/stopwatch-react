// formats the given centisecond time in MM:SS.CC notation.
function formatTimeForTimer(elapsedTime) {
    const milliseconds = elapsedTime % 1000;
    const [minutes, seconds, centiseconds] = [
        Math.floor(elapsedTime / 60000),
        Math.floor(elapsedTime / 1000) % 60,
        Math.round(milliseconds / 10)
    ].map(padNumber)
  
    return `${minutes}:${seconds}.${centiseconds}`
}
  
// format a number for use in the timer, i.e. pad numbers less than 10 with leading zeroes
function padNumber(value) {
    return value.toString().padStart(2, '0');
}

export default formatTimeForTimer;