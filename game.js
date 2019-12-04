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

    // Instantiate 8 car objects

    // carArray
    this.carArray = [];

    // const CAR_WIDTH = this.canvas.width / 28 * 1.5
    const carWidth = (this.canvas.width / 28) * 1.5;
    const carHeight = (this.canvas.height / 11 / 6.5) * 4;
    const truckWidth = (this.canvas.width / 28) * 2.5;
    const truckHeight = (this.canvas.height / 11 / 6.5) * 4;

    this.car1 = new Car(
      0,
      (this.canvas.height / 11) * 9 + carHeight / 4,
      carWidth,
      carHeight,
      5,
      this.ctx
    );
    this.car2 = new Car(
      0,
      (this.canvas.height / 11) * 8 + truckHeight / 4,
      truckWidth,
      truckHeight,
      7,
      this.ctx
    );
    this.car3 = new Car(
      0,
      (this.canvas.height / 11) * 7 + carHeight / 4,
      carWidth,
      carHeight,
      -10,
      this.ctx
    );
    this.car4 = new Car(
      0,
      (this.canvas.height / 11) * 6 + truckHeight / 4,
      truckWidth,
      truckHeight,
      15,
      this.ctx
    );

    this.carArray = [this.car1, this.car2, this.car3, this.car4];

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

    /* this.car1.draw();
    this.car2.draw();
    this.car3.draw();
    this.car4.draw(); */

    this.showPlayerScore();
    this.showPlayerLifes();
    this.carrot.draw();
    this.collectCarrot();
    //this.moveCar();
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

  move() {
    for (let i = 0; i < this.carArray.length; i++) {
      this.carArray[i].positionX = this.carArray[i].speed;
      if (this.carArray[i].positionX > this.canvas.width)
        this.carArray[i].positionX = 0;
    }
  }

  /*   moveCar() {
    this.car.positionX += this.car.speed;
    if (this.car.positionX > this.canvas.width) this.car.positionX = 0;
    
    this.car1.positionX += this.car1.speed;
    if (this.car1.positionX > this.canvas.width)  this.car1.positionX = 0;

    this.car2.positionX += this.car2.speed;
    if (this.car2.positionX > this.canvas.width)  this.car2.positionX = 0;

    this.car3.positionX += this.car3.speed;
    if (this.car3.positionX > this.canvas.width)  this.car3.positionX = 0;

    this.car4.positionX += this.car4.speed;
    if (this.car4.positionX > this.canvas.width)  this.car4.positionX = 0;
  } */

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
      return (this.carrot = new Carrot(
        this.canvas.width,
        this.canvas.height,
        this.ctx
      )); //this.carrot.draw();
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
