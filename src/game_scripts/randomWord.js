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

let listAllkeyword = {
  good: [],
  bad: [],
};
//debug
function logDebug(massage) {
  if (debugMode === true) {
    console.log(massage);
  }
}

function getAllWord(mapOfPlayer) {
  for (let player of mapOfPlayer.values()) {
    logDebug("get player from map : " + player);
    listAllkeyword.good.push(player.word[0]);
    logDebug(`Good word adding to array : ${listAllkeyword}`);
    listAllkeyword.bad.push(player.word[1]);
    logDebug(`Good word adding to array : ${listAllkeyword}`);
  }
}
getAllWord(mapPlayer);
logDebug("-----------------------")

function randomIndex(lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
}

function randomWordAllPlayer(mapOfPlayer, listWordObj) {
  if (listWordObj.length == 0) return;
  for (let player of mapOfPlayer.values()) {
    //clear word
    let tempGood = listWordObj.good.filter((word) => !player.word.includes(word));
    let tempBad = listWordObj.bad.filter((word) => !player.word.includes(word));
    logDebug(`Temp of good keyword : ${tempGood}`);
    logDebug(`Temp of good keyword : ${tempBad}`);

    //random index of each property
    let randomGoodIndex = randomIndex(tempGood.length);
    let randomBadIndex = randomIndex(tempBad.length);
    logDebug(
      `Random index of two temp array : GoodIndex ${randomGoodIndex},BadIndex ${randomBadIndex}`
    );
    
    //Assign keyword to property
    player.wordRandom = [
      tempGood[randomGoodIndex],
      tempBad[randomBadIndex]
    ];
    logDebug(player);

    //Remove keyword that are used
    listWordObj.good.splice(randomGoodIndex, 1);
    listWordObj.bad.splice(randomBadIndex, 1);
    logDebug("Available good words : "+ listWordObj.good);
    logDebug("Available bad words : "+ listWordObj.bad);
    logDebug("----------------------")
  }
}

randomWordAllPlayer(mapPlayer, listAllkeyword);

// logDebug(mapPlayer)

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
