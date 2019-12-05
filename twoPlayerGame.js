class RabbitTwoPlayerGame extends CanvasGame {
  constructor(width, height) {
    super(width, height);

    this.gameOverImg = new Image();
    this.gameOverImg.src = "./images/gameOver.jpg";
    this.winGameImg = new Image();
    this.winGameImg.src = "./images/winGame.jpg";

    this.road = new Road(this.canvas.width, this.canvas.height, this.ctx);
    this.player1 = new Player(
      (this.canvas.width / 28) * 2,
      (this.canvas.height / 11) * 10,
      "./images/Piedro.png",
      this.ctx
    );

    this.player2 = new Player(
      (this.canvas.width / 28) * 26,
      (this.canvas.height / 11) * 10,
      "./images/Francesca.png",
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
      7,
      "./images/truck.png",
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

    // change for 2 Player Game -> DONE
    this.movePlayer = this.movePlayer.bind(this);


    // change for 2 Player Game -> DONE
    document.onkeydown = e => this.movePlayer(e.keyCode);
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.draw();
    this.player1.draw();
    this.player2.draw();

    for (let i = 0; i < this.carArray.length; i++) {
      this.carArray[i].draw();
    }

    this.moveCars();

    // change for 2 Player Game -> DONE
    this.showPlayerOneScore();
    this.showPlayerTwoScore();

    // change for 2 Player Game -> DONE
    if (this.player1.points >= 10000 || this.player2.points >= 10000)
      return this.winGame();

    // change for 2 Player Game -> DONE
    this.showPlayerOneLifes();
    this.showPlayerTwoLifes();

    this.carrot.draw();
    this.collectCarrotPlayerOne();
    this.collectCarrotPlayerTwo();
    this.collidedPlayerOne();
    this.collidedPlayerTwo();
  }

  movePlayer(keyCode) {
    switch (keyCode) {
      // Player One Move
      case 87:
        console.log("P1 movie up");
        this.player1.positionY -= 10;
        if (
          this.player1.positionY <
          this.canvas.height / 11 - this.player1.height
        ) {
          this.player1.positionX = this.player1.startX;
          this.player1.positionY = this.player1.startY;
          return (this.player1.points += 500);
        }
        break;
      case 83:
        if (this.player1.positionY < this.road.height - 40)
          this.player1.positionY += 10;
        break;
      case 65:
        if (this.player1.positionX > 0) this.player1.positionX -= 10;
        break;
      case 68:
        if (this.player1.positionX < this.road.width - 40)
          this.player1.positionX += 10;
        break;

      //Player 2 Move
      case 38:
        this.player2.positionY -= 10;
        if (
          this.player2.positionY <
          this.canvas.height / 11 - this.player2.height
        ) {
          this.player2.positionX = this.player2.startX;
          this.player2.positionY = this.player2.startY;
          return (this.player2.points += 500);
        }
        break;
      case 40:
        if (this.player2.positionY < this.road.height - 40)
          this.player2.positionY += 10;
        break;
      case 37:
        if (this.player2.positionX > 0) this.player2.positionX -= 10;
        break;
      case 39:
        if (this.player2.positionX < this.road.width - 40)
          this.player2.positionX += 10;
        break;
    }
  }

  moveCars() {
    for (let i = 0; i < this.carArray.length; i++) {
      this.carArray[i].positionX += this.carArray[i].speed;
      if (
        this.carArray[i].positionX < -this.carArray[i].width ||
        this.carArray[i].positionX > this.canvas.width
      )
        this.carArray[i].positionX = this.carArray[i].startX;
    }
  }

  showPlayerOneScore() {
    let points = this.player1.points;
    let carrots = this.player1.carrots;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      `Score:  ${points}, Carrots:  ${carrots}`,
      (this.canvas.width / 28),
      (((this.canvas.height / 11) * 5) + (this.canvas.height / 30))
    );
  }

  showPlayerTwoScore() {
    let points = this.player2.points;
    let carrots = this.player2.carrots;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      `Score:  ${points}, Carrots:  ${carrots}`,
      (this.canvas.width / 28 * 22),
      (((this.canvas.height / 11) * 5) + (this.canvas.height / 30)))
    ;
  }

  showPlayerOneLifes() {
    let lifes = this.player1.lifes;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Life:  ${lifes}`, (this.canvas.width / 28), (((this.canvas.height / 11) * 6) - (this.canvas.height / 45)));
  }

  showPlayerTwoLifes() {
    let lifes = this.player2.lifes;
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Life:  ${lifes}`, (this.canvas.width / 28 * 22), (((this.canvas.height / 11) * 6) - (this.canvas.height / 45)));
  }

  collectCarrotPlayerOne() {
    if (
      this.player1.positionX < this.carrot.positionX + this.carrot.width &&
      this.player1.positionX + this.player1.width > this.carrot.positionX &&
      this.player1.positionY < this.carrot.positionY + this.carrot.height &&
      this.player1.positionY + this.player1.height > this.carrot.positionY
    ) {
      this.player1.points += 25;
      this.player1.carrots += 1;
      if (this.player1.carrots === 3) {
        this.player1.carrots = 0;
        this.player1.lifes += 1;
      }
      return (this.carrot = new Carrot(
        this.canvas.width,
        this.canvas.height,
        this.ctx
      ));
    }
  }

  collectCarrotPlayerTwo() {
    if (
      this.player2.positionX < this.carrot.positionX + this.carrot.width &&
      this.player2.positionX + this.player2.width > this.carrot.positionX &&
      this.player2.positionY < this.carrot.positionY + this.carrot.height &&
      this.player2.positionY + this.player2.height > this.carrot.positionY
    ) {
      this.player2.points += 25;
      this.player2.carrots += 1;
      if (this.player2.carrots === 3) {
        this.player2.carrots = 0;
        this.player2.lifes += 1;
      }
      return (this.carrot = new Carrot(
        this.canvas.width,
        this.canvas.height,
        this.ctx
      ));
    }
  }

  collidedPlayerOne() {
    for (let i = 0; i < this.carArray.length; i++) {
      if (
        this.player1.positionX <
          this.carArray[i].positionX + this.carArray[i].width &&
        this.player1.positionX + this.player1.width >
          this.carArray[i].positionX &&
        this.player1.positionY <
          this.carArray[i].positionY + this.carArray[i].height &&
        this.player1.positionY + this.player1.height >
          this.carArray[i].positionY
      ) {
        if (this.player1.lifes > 0) {
          this.player1.positionX = this.player1.startX;
          this.player1.positionY = this.player1.startY;
          this.player1.looseLife();
        } else {
          this.gameOver();
        }
      }
    }
  }

  collidedPlayerTwo() {
    for (let i = 0; i < this.carArray.length; i++) {
      if (
        this.player2.positionX <
          this.carArray[i].positionX + this.carArray[i].width &&
        this.player2.positionX + this.player2.width >
          this.carArray[i].positionX &&
        this.player2.positionY <
          this.carArray[i].positionY + this.carArray[i].height &&
        this.player2.positionY + this.player2.height >
          this.carArray[i].positionY
      ) {
        if (this.player2.lifes > 0) {
          this.player2.positionX = this.player2.startX;
          this.player2.positionY = this.player2.startY;
          this.player2.looseLife();
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
    this.ctx.drawImage(
      this.gameOverImg,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  winGame() {
    clearInterval(this.interval);
    this.ctx.drawImage(
      this.winGameImg,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
}
