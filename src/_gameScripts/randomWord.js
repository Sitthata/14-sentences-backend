const {logDebug} = require('../_lobbyHandle/logDebug')
const {mapPlayers} = require('./mapPlayers');
const {getAllKeywords} = require('./getAllKeywords')

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
randomWordAllPlayers(mapPlayers, getAllKeywords(mapPlayers));