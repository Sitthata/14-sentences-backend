let line = 1;
const debugMode = true; // Set to true to enable debug output, false to disable it

function logDebug(message) {
  if (debugMode) {
    console.log(line++ + " - " + message);
  }

}

module.exports = { logDebug };
