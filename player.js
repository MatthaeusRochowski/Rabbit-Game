//this will be the rabbit
class MovingRectangle {
  constructor(x, y, color, width, height, ctx) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.startX = x;
    this.startY = y;
    this.speed = 0;
    this.positionX = x;
    this.positionY = y;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}

class Player extends MovingRectangle {
  constructor(x, y, ctx) {
    super(x, y, "red", 40, 40, ctx);

    this.points = 0;
    this.lifes = 3;
    this.carrots = 0;
  }

  looseLife() {
    this.lifes -= 1;
    return this.lifes;
  }
}
