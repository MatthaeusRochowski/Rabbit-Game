class Carrot {
  constructor(x, y, ctx) {
    this.width = 30;
    this.height = 30;
    this.carrotImg = new Image();
    this.carrotImg.src = "./images/carrot.png";
    this.positionX = Math.floor(Math.random() * x - this.width);
    this.positionY = Math.floor(Math.random() * y - this.height);
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "orange";
    this.ctx.drawImage(this.carrotImg, this.positionX, this.positionY, this.width, this.height);
    //this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
