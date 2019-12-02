class CanvasGame {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: 1px solid white";
    this.ctx = this.canvas.getContext("2d");
    document.body.after(this.canvas, document.body.childNodes[0]);
  }
}

class RabbitGame extends CanvasGame {
  constructor(width, height) {
    super(width, height);

    this.road = new Road(width, height, this.ctx);
    this.road.draw(width, height);
  }
}

window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  startOnePlayer.onclick = function() {
    startGame();
  };

  function startGame() {
    let game = new RabbitGame(1400, 715);
    //startOnePlayer.disabled = true;
  }
};
