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
    
    this.img = new Image();
    this.img.src = "";
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
  }

 draw() {
  //this.ctx.fillStyle = this.color;
  
  this.ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
  //this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}

class Player extends MovingRectangle {
  constructor(x, y, imgSrc, ctx) {
    super(x, y, "red", 50, 50, ctx);
    this.img.src = imgSrc; //"./images/Piedro.png";
    this.points = 9400;
    this.lifes = 3;
    this.carrots = 0;
  }

  looseLife() {
    this.lifes -= 1;
    return this.lifes;
  }
}
