class Car extends MovingRectangle {
  constructor(x, y, width, height, speed, ctx) {
    super(x, y, "black", width, height, ctx);
    this.speed = speed;
   
  }
}
