class Road {
  constructor(width, height, ctx) {
    this.height = height;
    this.width = width;
    this.ctx = ctx;
    this.lane = this.height / 11;
  }

  draw() {
    //console.log("draw road");
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.width, this.lane); // upper grass this.lane
    this.ctx.fillRect(0, 10 * this.lane, this.width, this.lane); // lower grass this.lane
    this.ctx.fillRect(0, 5 * this.lane, this.width, this.lane); // middle grass this.lane

    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, this.lane, this.width, 4 * this.lane); // this.lanes direction left

    this.ctx.beginPath();
    this.ctx.lineWidth = 2.0;
    this.ctx.moveTo(0, 2 * this.lane);
    this.ctx.lineTo(this.width, 2 * this.lane);
    this.ctx.moveTo(0, 3 * this.lane);
    this.ctx.lineTo(this.width, 3 * this.lane);
    this.ctx.moveTo(0, 4 * this.lane);
    this.ctx.lineTo(this.width, 4 * this.lane);
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([20, 20]);
    this.ctx.stroke();

    this.ctx.fillRect(0, 6 * this.lane, this.width, 4 * this.lane); // this.lanes direction right
    this.ctx.beginPath();
    this.ctx.lineWidth = 2.0;
    this.ctx.moveTo(0, 7 * this.lane);
    this.ctx.lineTo(this.width, 7 * this.lane);
    this.ctx.moveTo(0, 8 * this.lane);
    this.ctx.lineTo(this.width, 8 * this.lane);
    this.ctx.moveTo(0, 9 * this.lane);
    this.ctx.lineTo(this.width, 9 * this.lane);
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([20, 20]);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.lane);
    this.ctx.lineTo(this.width, this.lane);
    this.ctx.moveTo(0, 5 * this.lane);
    this.ctx.lineTo(this.width, 5 * this.lane);
    this.ctx.moveTo(0, 6 * this.lane);
    this.ctx.lineTo(this.width, 6 * this.lane);
    this.ctx.moveTo(0, 10 * this.lane);
    this.ctx.lineTo(this.width, 10 * this.lane);
    this.ctx.setLineDash([]);
    this.ctx.stroke();
  }
}
