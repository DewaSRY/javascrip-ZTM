// const warriorsGames = require(".models");
// const listId = document.getElementById("list");
const ulParent = document.createElement("ul");
for (let game of warriorsGames) {
  const { homeTeam, awayTeam } = game;
  const { points: hPoint, team: hTeam } = homeTeam;
  const { points: aPoint, team: aTeam } = awayTeam;
  const gamelist = document.createElement("li");
  const teamName = `${aTeam},@ ${hTeam}`;
  const scoreLine =
    aPoint > hPoint
      ? `<b>${aPoint}</b>--${hPoint}`
      : `${aPoint}--<b>${hPoint}</b>`;

  gamelist.innerHTML = `${teamName} ${scoreLine}`;
  gamelist.classList.add(homeTeam.isWinner ? "win" : "loss");
  ulParent.appendChild(gamelist);
}
// listId.appendChild(ulParent);
document.body.append(ulParent);
