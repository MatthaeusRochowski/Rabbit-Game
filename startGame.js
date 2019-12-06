window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  const startTwoPlayer = document.getElementById("start-2-player-game");
  var myCanvas;

  startOnePlayer.onclick = function() {
    myCanvas = document.getElementById("canvasId");
    if(myCanvas) myCanvas.remove();
    let headerHeight = document.querySelector("header").clientHeight;
    new RabbitOnePlayerGame(window.innerWidth * 0.90, window.innerHeight * 0.95 - headerHeight);
  };

  startTwoPlayer.onclick = function() {
    myCanvas = document.getElementById("canvasId");
    if(myCanvas) myCanvas.remove();
    let headerHeight = document.querySelector("header").clientHeight;
    new RabbitTwoPlayerGame(window.innerWidth * 0.90, window.innerHeight * 0.95 - headerHeight);
  };
};
