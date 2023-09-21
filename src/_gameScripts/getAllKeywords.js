const { mapPlayers } = require("./mapPlayers");
const { logDebug } = require("../_lobbyHandle/logDebug");

//Object for store list of word from player
let listAllkeyword = {
    good: [],
    bad: [],
  };
  
  function getAllWord(mapOfPlayer) {
    for (let player of mapOfPlayer.values()) {
      logDebug(`get player from map : ${player.word}`);
      listAllkeyword.good.push(player.word[0]);
      logDebug(`Good word adding to array : ${listAllkeyword.good}`);
      listAllkeyword.bad.push(player.word[1]);
      logDebug(`Bad word adding to array : ${listAllkeyword.bad}`);
    }
  }
  
  // get data to Object listAllKeyword
  getAllWord(mapPlayers);
  logDebug("-----------------------");

  module.exports = {
    listAllkeyword
  }