class Carrot {
  constructor(x, y, width, height, ctx) {
    this.width = width;
    this.height = height;
    this.carrotImg = new Image();
    this.carrotImg.src = "./images/carrot.png";
    this.positionX = Math.floor(Math.random() * x - this.width);
    this.positionY = Math.floor(Math.random() * y - this.height);
    this.ctx = ctx;
  }

  draw() {
    //this.ctx.fillStyle = "orange";
    this.ctx.drawImage(this.carrotImg, this.positionX, this.positionY, this.width, this.height);
  }
}
