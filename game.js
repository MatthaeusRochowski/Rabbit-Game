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

    this.frames = 0;
    this.updateGamesState = this.updateGamesState.bind(this);
    this.interval = setInterval(this.updateGamesState, 30);
    this.road.draw();
    this.movePlayer = this.movePlayer.bind(this);
    this.stopPlayer = this.stopPlayer.bind(this);
    document.onkeydown = e => this.movePlayer(e.keyCode);
    document.onkeyup = e => this.stopPlayer(e.keyCode);
    //debugger;
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.draw();
    this.showPlayerScore();
    this.showPlayerLifes();
    this.player.update();
    this.player.addPoints();
  }

  movePlayer(keyCode) {
    switch (keyCode) {
      case 38:
        this.player.speedY -= 1;
        if (this.player.positionY < this.canvas.height / 10 - this.player.height) {
          debugger;
          this.player.positionX = this.player.startX;
          this.player.positionY = this.player.startY;
          return (this.player.points += 500);
        }
        break;
      case 40:
        this.player.speedY += 1;
        break;
      case 37:
        this.player.speedX -= 1;
        break;
      case 39:
        this.player.speedX += 1;
        break;
      default:
    }
  }

  stopPlayer(keyCode) {
    this.player.speedX = 0;
    this.player.speedY = 0;
  }

  showPlayerScore() {
    let points = this.player.points;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score:  ${points}`, 10, this.canvas.height / 2 - 10);
  }

  showPlayerLifes() {
    let lifes = this.player.lifes;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Life:  ${lifes}`, 10, this.canvas.height / 2 + 20);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}



/*   function startGame(playerNo) {
    switch (playerNo) {
      case "1p":
          return new RabbitGame(1400, 715);
    }
    //startOnePlayer.disabled = true;
  } */
