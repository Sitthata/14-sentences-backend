const { mapPlayers } = require("./mapPlayers");
const { logDebug } = require("../_lobbyHandle/logDebug");

//Object for store list of word from player
let listAllkeywords = {
    good: [],
    bad: [],
  };
  
  function getAllWord(mapOfPlayer) {
    for (let player of mapOfPlayer.values()) {
      logDebug(`get player from map : ${player.word}`);
      listAllkeywords.good.push(player.word[0]);
      logDebug(`Good word adding to array : ${listAllkeywords.good}`);
      listAllkeywords.bad.push(player.word[1]);
      logDebug(`Bad word adding to array : ${listAllkeywords.bad}`);
    }
  }
  
  // get data to Object listAllKeywords
  getAllWord(mapPlayers);
  logDebug("-----------------------");

  module.exports = {
    listAllkeywords
  }