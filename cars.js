class Car extends MovingRectangle {
  constructor(x, y, width, height, speed, ctx) {
    super(x, y, "black", width, height, ctx);
    this.speed = speed;
   
  }
  //draw() {
    //this.ctx.fillStyle = "black";
    //this.ctx.drawImage(this.carImg, this.positionX, this.positionY, this.width, this.height);
//}
}
