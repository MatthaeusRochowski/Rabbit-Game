window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  const startTwoPlayer = document.getElementById("start-2-player-game");
  var myCanvas;

  startOnePlayer.onclick = function() {
    myCanvas = document.getElementById("canvasId");
    if(myCanvas) myCanvas.remove();
    new RabbitOnePlayerGame(1400, 715);
    console.log(myCanvas);
  };

  startTwoPlayer.onclick = function() {
    myCanvas = document.getElementById("canvasId");
    if(myCanvas) myCanvas.remove();
    new RabbitTwoPlayerGame(1400, 715);
  };
};
