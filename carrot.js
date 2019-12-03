class Carrot {
  constructor(x, y, ctx) {
    this.positionX = 300;
    this.positionY = 500;
    this.width = 30;
    this.height = 30;
    this.ctx = ctx;
  }

  left() {
    return this.positionX;
  }
  right() {
    return this.positionX + this.width;
  }
  top() {
    return this.positionY;
  }
  bottom() {
    return this.position + this.height;
  }

  draw() {
    console.log(this.positionX, this.positionY);
    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
