//this will be the rabbit
class MovingRectangle {
  constructor(x, y, color, width, height, ctx) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.startX = x;
    this.startY = y;
    this.positionX = x;
    this.positionY = y;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    console.log("ich bin das Rectangle");
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  setPlayer() {
    this.startX;
    this.startY;
    this.draw();
  }
}

class Player extends MovingRectangle {
  constructor(x, y, ctx) {
    super(x, y, "red", 40, 40, ctx);

    this.points = 0;
    this.lifes = 3;
  }


  addPoints() {
    if (this.positionY < this.height / 10) return (this.points += 500);
  }

  looseLife() {
    this.lifes -= 1;
    return this.lifes;
  }
}
