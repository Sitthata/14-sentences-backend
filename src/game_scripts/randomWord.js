const mapPlayer = new Map();
const debugMode = true;
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
mapPlayer.set(0, player1);
mapPlayer.set(1, player2);
mapPlayer.set(2, player3);

let listOfGoodWord = [];
let listOfBadWord = [];
//debug
function logDebug(massage) {
  if (debugMode === true) {
    console.log(massage);
  }
}

function getAllWord(mapOfPlayer) {
  const countAllplayer = mapOfPlayer.size;
  for (let i = 0; i < countAllplayer; i++) {
    const player = mapOfPlayer.get(i);
    logDebug("get player from map : " + player);
    listOfGoodWord.push(player.word[0]);
    logDebug(`Good word adding to array : ${listOfGoodWord}`);
    listOfBadWord.push(player.word[1]);
    logDebug(`Good word adding to array : ${listOfGoodWord}`);
  }
}
getAllWord(mapPlayer)
logDebug(listOfGoodWord)
logDebug(listOfBadWord)
function getRandomIndex(arrayOfWord) {
  return Math.floor(Math.random() * arrayOfWord.length);
}
function randomWordAllPlayer(mapOfPlayer, arrOfGoodWord, arrOfBadWord) {
  for(let player of mapOfPlayer.values()){
    const tempGood = arrOfGoodWord.filter((word) => !player.word.includes(word));
    logDebug(tempGood, 'temp good');
    const tempBad = arrOfBadWord.filter((word) => !player.word.includes(word));
    logDebug(tempBad, 'temp bad');

    const indexGood = getRandomIndex(tempGood);
    const indexBad = getRandomIndex(tempBad);

    // eslint-disable-next-line no-prototype-builtins
    if (!player.hasOwnProperty("randomWord")) {
      player.randomWord = new Array();
      logDebug("create new property array")
    }
    player.randomWord = [arrOfGoodWord[indexGood], arrOfBadWord[indexBad]]
    arrOfGoodWord.splice(indexGood, 1);
    arrOfBadWord.splice(indexBad, 1);
  }
}
randomWordAllPlayer(mapPlayer, listOfGoodWord, listOfBadWord)
logDebug(mapPlayer)

// function randomWord(player, arrayOfWord) {
//   if (!player && arrayOfWord.length === 0) return;
//   const randomIndex = Math.floor(Math.random() * arrayOfWord.length);
//   logDebug(`random index : ${randomIndex}`);
//   const wordRandom = arrayOfWord[randomIndex];
//   logDebug(`random word from array ${arrayOfWord} is :  ${wordRandom}`);
//   if (player.word.includes(wordRandom)) {
//     logDebug("player get own word. random again");
//     randomWord(player, arrayOfWord);
//   } else {
//     if (player["getRandom"] === undefined) {
//       player["getRandom"] = new Array(wordRandom);
//       logDebug(`create new property and get randomword: ${player.getRandom}`);
//     } else {
//       player.getRandom.push(wordRandom);
//       logDebug("push new element to randomWord property : " + player.getRandom);
//     }
//     // remove element in array
//     arrayOfWord.splice(randomIndex, 1);
//     logDebug("remove used element.");
//   }
// }

// function randomWordAllPlayer(mapOfPlayer, arrOfGoodWord, arrOfBadWord) {
//   if (!mapOfPlayer) return;
//   //loop and randomword
//   for (let i = mapOfPlayer.size - 1; i >= 0; i--) {
//     let player = mapOfPlayer.get(i);
//     randomWord(player, arrOfGoodWord);
//     randomWord(player, arrOfBadWord);
//     if(arrOfBadWord.length === 1 || arrOfGoodWord.length === 1){
//       player.getRandom = new Array(arrOfGoodWord[0], arrOfBadWord[0])
//     }
//   }
// }
// randomWordAllPlayer(mapPlayer, goodWord, badWord);
// console.log(mapPlayer);
// console.log(mapPlayer.get(1))
// const testPlayer = mapPlayer.get(1);
// randomWord(testPlayer, goodWord);
// randomWord(testPlayer, badWord);
// console.log(testPlayer);
// console.log(goodWord)
// console.log(badWord)
