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

    this.gameOverImg = new Image();
    this.gameOverImg.src = "./images/gameOver.jpg";
    this.winGameImg = new Image();
    this.winGameImg.src = "./images/winGame.jpg";

    this.road = new Road(this.canvas.width, this.canvas.height, this.ctx);
    this.player = new Player(
      (this.canvas.width / 28) * 2,
      (this.canvas.height / 11) * 10,
      "./images/Piedro.png",
      this.ctx
    );
    this.carrot = new Carrot(this.canvas.width, this.canvas.height, this.ctx);

    // Instantiate 8 car objects
    // carArray
    this.carArray = [];

    const carWidth = (this.canvas.width / 28) * 1.5;
    const carHeight = (this.canvas.height / 11 / 6.5) * 4;
    const truckWidth = (this.canvas.width / 28) * 2.5;
    const truckHeight = (this.canvas.height / 11 / 6.5) * 4;

    this.car1 = new Car(
      -carWidth,
      (this.canvas.height / 11) * 9 + carHeight / 4,
      carWidth,
      carHeight,
      5,
      "./images/car2.right.png",
      this.ctx
    );
    this.car2 = new Car(
      -carWidth,
      (this.canvas.height / 11) * 8 + truckHeight / 4,
      truckWidth,
      truckHeight,
      7, "./images/truck.png",
      this.ctx
    );
    this.car3 = new Car(
      -carWidth,
      (this.canvas.height / 11) * 7 + carHeight / 4,
      carWidth,
      carHeight,
      10,
      "./images/car.png",
      this.ctx
    );
    this.car4 = new Car(
      -carWidth,
      (this.canvas.height / 11) * 6 + truckHeight / 4,
      truckWidth,
      truckHeight,
      15,
      "./images/truck.png",
      this.ctx
    );

    //Cars right side

    this.car5 = new Car(
      1400,
      (this.canvas.height / 11) * 1 + carHeight / 4,
      carWidth,
      carHeight,
      -5,
      "./images/car2.png",
      this.ctx
    );
    this.car6 = new Car(
      1400,
      (this.canvas.height / 11) * 2 + truckHeight / 4,
      truckWidth,
      truckHeight,
      -7,
      "./images/truck.left.png",
      this.ctx
    );
    this.car7 = new Car(
      1400,
      (this.canvas.height / 11) * 3 + carHeight / 4,
      carWidth,
      carHeight,
      -10,
      "./images/car.left.png",
      this.ctx
    );
    this.car8 = new Car(
      1400,
      (this.canvas.height / 11) * 4 + truckHeight / 4,
      truckWidth,
      truckHeight,
      -15,
      "./images/truck.left.png",
      this.ctx
    );

    this.carArray = [
      this.car1,
      this.car2,
      this.car3,
      this.car4,
      this.car5,
      this.car6,
      this.car7,
      this.car8
    ];

    this.frames = 0;
    this.updateGamesState = this.updateGamesState.bind(this);
    this.interval = setInterval(this.updateGamesState, 30);
    this.road.draw();
    this.movePlayer = this.movePlayer.bind(this);
    document.onkeydown = e => this.movePlayer(e.keyCode);
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.draw();
    this.player.draw();

    for (let i = 0; i < this.carArray.length; i++) {
      this.carArray[i].draw();
    }

    this.move();

    this.showPlayerScore();
    if(this.player.points >= 10000) return this.winGame();
    this.showPlayerLifes();
    this.carrot.draw();
    this.collectCarrot();
    this.collided();
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
          return this.player.points += 500;
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

        /*
case 38:
        this.player2.positionY -= 10;
        if (
          this.player2.positionY <
          this.canvas.height / 11 - this.player2.height
        ) {
          this.player.positionX = this.player.startX;
          this.player.positionY = this.player.startY;
          return (this.player.points += 500);
        }
        break;
      case 65:
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
        */
      default:
    }
  }

  move() {
    for (let i = 0; i < this.carArray.length; i++) {
      this.carArray[i].positionX += this.carArray[i].speed;
      if (
        this.carArray[i].positionX < -this.carArray[i].width ||
        this.carArray[i].positionX > this.canvas.width
      )
        this.carArray[i].positionX = this.carArray[i].startX;
    }
  }

  showPlayerScore() {
    let points = this.player.points;
    let carrots = this.player.carrots;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      `Score:  ${points}, Carrots:  ${carrots}`,
      10,
      this.canvas.height / 2 - 10
    );
  }

  showPlayerLifes() {
    let lifes = this.player.lifes;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Life:  ${lifes}`, 10, this.canvas.height / 2 + 20);
  }

  collectCarrot() {
    if (
      this.player.positionX < this.carrot.positionX + this.carrot.width &&
      this.player.positionX + this.player.width > this.carrot.positionX &&
      this.player.positionY < this.carrot.positionY + this.carrot.height &&
      this.player.positionY + this.player.height > this.carrot.positionY
    ) {
      this.player.points += 25;
      this.player.carrots += 1;
      if (this.player.carrots === 3) {
        this.player.carrots = 0;
        this.player.lifes += 1;
      }
      return (this.carrot = new Carrot(
        this.canvas.width,
        this.canvas.height,
        this.ctx
      ));
    }
  }

  collided() {
    for (let i = 0; i < this.carArray.length; i++) {
      if (
        this.player.positionX <
          this.carArray[i].positionX + this.carArray[i].width &&
        this.player.positionX + this.player.width >
          this.carArray[i].positionX &&
        this.player.positionY <
          this.carArray[i].positionY + this.carArray[i].height &&
        this.player.positionY + this.player.height > this.carArray[i].positionY
      ) {
        if (this.player.lifes > 0) {
        this.player.positionX = this.player.startX;
        this.player.positionY = this.player.startY;
        this.player.looseLife();
        } else {
          this.gameOver(); 
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  gameOver() {
    clearInterval(this.interval);
    this.ctx.drawImage(this.gameOverImg, 0, 0, this.canvas.width, this.canvas.height);
  }

  winGame() {
    clearInterval(this.interval);
    this.ctx.drawImage(this.winGameImg, 0, 0, this.canvas.width, this.canvas.height);
  }
}

window.onload = function() {
  const startOnePlayer = document.getElementById("start-1-player-game");
  startOnePlayer.onclick = function() {
    new RabbitGame(1400, 715);
    startOnePlayer.disabled = true;
  };
};
