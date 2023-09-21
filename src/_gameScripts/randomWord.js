const mapPlayer = new Map();
const debugMode = false; //Debug mode, set to true to enable debug output, false to disable it

const player1 = {
  username: "p1",
  word: ["good1", "bad1"],
};
const player2 = {
  username: "p2",
  word: ["good2", "bad2"],
};
const player3 = {
  username: "p3",
  word: ["good3", "bad3"],
};
const player4 = {
  username: "p4",
  word: ["good4", "bad4"],
};
const player5 = {
  username: "p5",
  word: ["good5", "bad5"],
};

mapPlayer.set(0, player1);
mapPlayer.set(1, player2);
mapPlayer.set(2, player3);
mapPlayer.set(3, player4);
mapPlayer.set(4, player5);

// Object to store lists of words from players
const listAllKeywords = {
  good: [],
  bad: [],
};

// Function for debugging
function logDebug(message) {
  if (debugMode) {
    console.log(message);
  }
}

// Function to extract all words from players and populate the listAllKeywords object
function getAllWords(mapOfPlayers) {
  for (const player of mapOfPlayers.values()) {
    const [goodWord, badWord] = player.word;
    listAllKeywords.good.push(goodWord);
    listAllKeywords.bad.push(badWord);
  }
}

// Function to get a random index within the length of an array
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// Function to assign random words to players
function assignRandomWords(player, availableGoodWords, availableBadWords) {
  const randomGoodIndex = getRandomIndex(availableGoodWords);
  const randomBadIndex = getRandomIndex(availableBadWords);
  const randomGoodWord = availableGoodWords[randomGoodIndex]
  const randomBadWord = availableBadWords[randomBadIndex];
  player.wordRandom = [randomGoodWord, randomBadWord];
  return [randomGoodIndex, randomBadIndex]
}

// Function to assign random words to all players
function randomWordAllPlayers(mapOfPlayers, listWordObj) {
  if (listWordObj.good.length === 0 || listWordObj.bad.length === 0) {
    return;
  }

  for (const player of mapOfPlayers.values()) {
    // If last word, assign it to the property
    if (listWordObj.good.length === 1 && listWordObj.bad.length === 1) {
      player.wordRandom = [listWordObj.good[0], listWordObj.bad[0]];
      continue;
    }

    // Filter available words for this player
    const filterGoodWords = listWordObj.good.filter((word) => !player.word.includes(word));
    const filterBadWords = listWordObj.bad.filter((word) => !player.word.includes(word));

    logDebug(`Temp of good keywords: ${filterGoodWords}`);
    logDebug(`Temp of bad keywords: ${filterBadWords}`);

    // Assign random words to the player
    const deleteIndex = assignRandomWords(player, filterGoodWords, filterBadWords);
    listWordObj.good.splice(deleteIndex[0], 1)
    listWordObj.bad.splice(deleteIndex[1], 1)

    logDebug(player);
    logDebug("Available good words: " + listWordObj.good);
    logDebug("Available bad words: " + listWordObj.bad);
    logDebug("----------------------");
  }
}

// Example usage:
getAllWords(mapPlayer);
randomWordAllPlayers(mapPlayer, listAllKeywords);
