const mapPlayer = new Map();
const player1 = {
    username: "p1",
    word: ["good1", "bad1"]
}
const player2 = {
    username: "p2",
    word: ["good2", "bad2"]
}
const player3 = {
    username: "p3",
    word: ["good3", "bad3"]
}
mapPlayer.set(0, player1)
mapPlayer.set(1, player2)
mapPlayer.set(2, player3)

let goodWord = [];
let badWord = [];

//for 1 times called .length
const countAllplayer = mapPlayer.size;
for (let i = 0; i< countAllplayer; i++){
    const playerTemp = mapPlayer.get(i);
    console.log(playerTemp.word)
    goodWord.push(playerTemp.word[0])
    badWord.push(playerTemp.word[1])
}

function randomWordAllPlayer(allPlayer, goodWord, badWord){
    
}

function randomWord(player , arrayOfWord){
    const randomIndex = Math.floor(Math.random() * arrayOfWord.length)
    const wordRandom = arrayOfWord[randomIndex]
    if(player.word.includes(wordRandom)){
        randomWord(player, arrayOfWord)
    }else {
        if(!player.hasOwnProperty("randomWord")){
            player.randomword = [wordRandom];
        }else {
            player.randomWord.push(wordRandom);
        }
        // remove element in array
        arrayOfWord.splice(randomIndex, 1)
    }
}

// randomWord(player1, goodWord)
// console.log(player1)
// console.log(goodWord)
// console.log(badWord)