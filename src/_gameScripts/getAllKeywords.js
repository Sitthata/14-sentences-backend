// Object to store lists of words from players
const listAllKeywords = {
  good: [],
  bad: [],
};

// Function to extract all words from players and populate the listAllKeywords object
function getAllKeywords(mapOfPlayers) {
  for (const player of mapOfPlayers.values()) {
    const [goodWord, badWord] = player.word;
    listAllKeywords.good.push(goodWord);
    listAllKeywords.bad.push(badWord);
  }
  return listAllKeywords;
}

module.exports = {
    getAllKeywords,
    listAllKeywords
}