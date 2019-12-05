window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  const startTwoPlayer = document.getElementById("start-2-player-game");
  startOnePlayer.onclick = function() {
    new RabbitOnePlayerGame(1400, 715);
    startOnePlayer.disabled = true;
  };
  startTwoPlayer.onclick = function() {
    new RabbitTwoPlayerGame(1400, 715);
    startTwoPlayer.disabled = true;
  };
};
