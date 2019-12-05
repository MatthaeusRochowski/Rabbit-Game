class Car extends MovingRectangle {
  constructor(x, y, width, height, speed, imgSrc, ctx) {
    super(x, y, "black", width, height, ctx);
    this.speed = speed;
    this.img.src = imgSrc; //"./images/car2.png";
  }
  
}
