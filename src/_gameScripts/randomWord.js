const mapPlayer = new Map();
const {logDebug} = require('../_lobbyHandle/logDebug')

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

//Object for store list of word from player
let listAllkeyword = {
  good: [],
  bad: [],
};

function getAllWord(mapOfPlayer) {
  for (let player of mapOfPlayer.values()) {
    logDebug("get player from map : " + player);
    listAllkeyword.good.push(player.word[0]);
    logDebug(`Good word adding to array : ${listAllkeyword}`);
    listAllkeyword.bad.push(player.word[1]);
    logDebug(`Good word adding to array : ${listAllkeyword}`);
  }
}

// get data to Object listAllKeyword
getAllWord(mapPlayer);
logDebug("-----------------------");

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
    const indexBadRemove = listWordObj.bad.indexOf(filterBad[randomBadIndex]);
    listWordObj.good.splice(indexGoodRemove, 1);
    listWordObj.bad.splice(indexBadRemove, 1);
    logDebug("Available good words : " + listWordObj.good);
    logDebug("Available bad words : " + listWordObj.bad);
    logDebug("----------------------");
  }
}

randomWordAllPlayer(mapPlayer, listAllkeyword);
