class Road {
  constructor(width, height, ctx) {

    this.ctx = ctx;
  }

  draw(width, height) {
    let lane = height / 11;

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, width, lane); // upper grass lane
    this.ctx.fillRect(0, 10 * lane, width, lane); // lower grass lane
    this.ctx.fillRect(0, 5 * lane, width, lane); // middle grass lane

    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, lane, width, 4 * lane); // lanes direction left

    this.ctx.beginPath();
    this.ctx.lineWidth = 2.0;
    this.ctx.moveTo(0, 2 * lane);
    this.ctx.lineTo(width, 2 * lane);
    this.ctx.moveTo(0, 3 * lane);
    this.ctx.lineTo(width, 3 * lane);
    this.ctx.moveTo(0, 4 * lane);
    this.ctx.lineTo(width, 4 * lane);
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([20, 20]);
    this.ctx.stroke();

    this.ctx.fillRect(0, 6 * lane, width, 4 * lane); // lanes direction right
    this.ctx.beginPath();
    this.ctx.lineWidth = 2.0;
    this.ctx.moveTo(0, 7 * lane);
    this.ctx.lineTo(width, 7 * lane);
    this.ctx.moveTo(0, 8 * lane);
    this.ctx.lineTo(width, 8 * lane);
    this.ctx.moveTo(0, 9 * lane);
    this.ctx.lineTo(width, 9 * lane);
    this.ctx.strokeStyle = "white";
    this.ctx.setLineDash([20, 20]);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, lane);
    this.ctx.lineTo(width, lane);
    this.ctx.moveTo(0, 5 * lane);
    this.ctx.lineTo(width, 5 * lane);
    this.ctx.moveTo(0, 6 * lane);
    this.ctx.lineTo(width, 6 * lane);
    this.ctx.moveTo(0, 10 * lane);
    this.ctx.lineTo(width, 10 * lane);
    this.ctx.setLineDash([]);
    this.ctx.stroke();
  }
}
