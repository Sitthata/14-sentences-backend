const mapPlayers = new Map();
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

mapPlayers.set(0, player1);
mapPlayers.set(1, player2);
mapPlayers.set(2, player3);
mapPlayers.set(3, player4);
mapPlayers.set(4, player5);

module.exports = {
    mapPlayers
}