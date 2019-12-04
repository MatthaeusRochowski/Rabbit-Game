class Car extends MovingRectangle {
  constructor(x, y, width, height, speed, ctx) {
    console.log("i am a car at: ", x, y);
    super(x, y, "black", width, height, ctx);
    this.speed = speed;
   
  }
}
