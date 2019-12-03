//this will be the rabbit
class MovingRectangle {
  constructor(x, y, color, width, height, ctx) {
    this.width = width;
    this.height = height;
    this.color = color;
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

  update() {
    this.positionX += this.speedX;
    this.positionY += this.speedY;
    this.draw();
  }
}

class Player extends MovingRectangle {
  constructor(x, y, ctx) {
    super(x, y, "red", 40, 40, ctx);
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 38:
          this.speedY -= 1;
          break;
        case 40:
          this.speedY += 1;
          break;
        case 37:
          this.speedX -= 1;
          break;
        case 39:
          this.speedX += 1;
          break;
        default:
      }
    };
    document.onkeyup = e => {
      this.speedX = 0;
      this.speedY = 0;
    };
  }
}
