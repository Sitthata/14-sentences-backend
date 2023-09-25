const { logDebug } = require("../_lobbyHandle/logDebug");

// for testing output terminal
// const { listAllkeywords } = require("./getAllKeywords");
// const { mapPlayers } = require("./mapPlayers");

// random index between length
function randomIndex(lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
}

// random keyword for player
function randomWordAllPlayer(mapOfPlayer, listWordObj) {
  if (listWordObj.length == 0) return;
  for (let player of mapOfPlayer.values()) {
    //If last word, assign it to property
    if (listWordObj.good.length === 1 && listWordObj.bad.length === 1) {
      player.wordRandom = [listWordObj.good[0], listWordObj.bad[0]];
      logDebug(`player receive word : ${player.wordRandom}`);
      continue;
    }

    //clear player's word
    let filterGood = listWordObj.good.filter(
      (word) => !player.word.includes(word)
    );
    let filterBad = listWordObj.bad.filter(
      (word) => !player.word.includes(word)
    );
    logDebug(`Temp of good keyword : ${filterGood}`);
    logDebug(`Temp of good keyword : ${filterBad}`);

    //random index of each property
    let randomGoodIndex = randomIndex(filterGood.length);
    let randomBadIndex = randomIndex(filterBad.length);
    logDebug(
      `Random index of two temp array : GoodIndex ${randomGoodIndex},BadIndex ${randomBadIndex}`
    );

    //Assign keyword to property
    player.wordRandom = [
      filterGood[randomGoodIndex],
      filterBad[randomBadIndex],
    ];
    logDebug(`player receive word : ${player.wordRandom}`);

    //Remove keyword that are used
    const indexGoodRemove = listWordObj.good.indexOf(
      filterGood[randomGoodIndex]
    );
    const indexBadRemove = listWordObj.bad.indexOf(
      filterBad[randomBadIndex]
    );
    listWordObj.good.splice(indexGoodRemove, 1);
    listWordObj.bad.splice(indexBadRemove, 1);
    logDebug("Available good words : " + listWordObj.good);
    logDebug("Available bad words : " + listWordObj.bad);
    logDebug("----------------------");
  }
}

// testing output
// randomWordAllPlayer(mapPlayers, listAllkeywords);
exports.randomWordAllPlayer = randomWordAllPlayer;
