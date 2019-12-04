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

    this.road = new Road(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(
      (this.canvas.width / 28) * 2,
      (this.canvas.height / 11) * 10,
      this.ctx
    );
    this.carrot = new Carrot(this.canvas.width, this.canvas.height, this.ctx);

    this.frames = 0;
    this.updateGamesState = this.updateGamesState.bind(this);
    this.interval = setInterval(this.updateGamesState, 30);
    this.road.draw();
    this.movePlayer = this.movePlayer.bind(this);
    //this.collectCarrot = this.collectCarrot.bind(this);
    document.onkeydown = e => this.movePlayer(e.keyCode);
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.draw();
    this.player.draw();
    this.showPlayerScore();
    this.showPlayerLifes();
    this.carrot.draw();
    this.collectCarrot();
  }

  movePlayer(keyCode) {
    switch (keyCode) {
      case 38:
        this.player.positionY -= 10;
        if (
          this.player.positionY <
          this.canvas.height / 11 - this.player.height
        ) {
          this.player.positionX = this.player.startX;
          this.player.positionY = this.player.startY;
          return (this.player.points += 500);
        }
        break;
      case 40:
        if (this.player.positionY < this.road.height - 40)
          this.player.positionY += 10;
        break;
      case 37:
        if (this.player.positionX > 0) this.player.positionX -= 10;
        break;
      case 39:
        if (this.player.positionX < this.road.width - 40)
          this.player.positionX += 10;
        break;
      default:
    }
  }

  showPlayerScore() {
    let points = this.player.points;
    let carrots = this.player.carrots;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score:  ${points}, Carrots:  ${carrots}`, 10, this.canvas.height / 2 - 10);
  }

  showPlayerLifes() {
    let lifes = this.player.lifes;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Life:  ${lifes}`, 10, this.canvas.height / 2 + 20);
  }

  collectCarrot() {
    //console.log("collect Carrot");
    if (
      this.player.positionX < this.carrot.positionX + this.carrot.width && //player finds carrot left to him
      this.player.positionX + this.player.width > this.carrot.positionX && //player finds carrot right to him
      this.player.positionY < this.carrot.positionY + this.carrot.height && //player finds carrot above to him
      this.player.positionY + this.player.height > this.carrot.positionY //player finds carrot bottom to him
    ) {
      this.player.points += 25;
      this.player.carrots += 1;
      if (this.player.carrots === 3) {
        this.player.carrots = 0;
        this.player.lifes += 1;
      } 
      return this.carrot = new Carrot(this.canvas.width, this.canvas.height, this.ctx); //this.carrot.draw();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  startOnePlayer.onclick = function() {
    new RabbitGame(1400, 715);
    startOnePlayer.disabled = true;
  };
};
