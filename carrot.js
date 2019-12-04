class Carrot {
  constructor(x, y, ctx) {
    this.width = 30;
    this.height = 30;
    this.positionX = Math.floor(Math.random() * x - this.width);
    this.positionY = Math.floor(Math.random() * y - this.height);
    this.ctx = ctx;
  }

  draw() {
    console.log(this.positionX, this.positionY);
    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
