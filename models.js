const warriorsGames = new Array();
const teamName = ["Golden State", "Houston"];
for (let count = 0; count < 10; count++) {
  const aPoint = 100 + Math.floor(Math.random() * 100);
  const hPoint = 100 + Math.floor(Math.random() * 100);
  const awatyIndex = Math.floor(Math.random() * 2);
  const homeIndex = Math.abs(awatyIndex - 1);
  const gameData = {
    awayTeam: {
      team: teamName[awatyIndex],
      points: aPoint,
      isWinner: aPoint > hPoint,
    },
    homeTeam: {
      team: teamName[homeIndex],
      points: hPoint,
      isWinner: aPoint < hPoint,
    },
  };
  warriorsGames.push(gameData);
}
