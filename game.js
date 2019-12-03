class CanvasGame {
  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = "border: 1px solid white";
    this.ctx = this.canvas.getContext("2d");
    document.body.after(this.canvas, document.body.childNodes[0]);
  }
}

class RabbitGame extends CanvasGame {
  constructor(width, height) {
    super(width, height);

    this.road = new Road( this.canvas.width,  this.canvas.height, this.ctx);
    this.player = new Player( this.canvas.width/28*2,  this.canvas.height/11*10, this.ctx); 

    this.frames = 0;
    this.updateGamesState = this.updateGamesState.bind(this);
    this.interval = setInterval(this.updateGamesState, 30);
    this.road.draw();
    //debugger;
  }

  updateGamesState() {
    this.clearCanvas();
    this.frames += 1;
    this.road.draw();
    this.player.update();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

window.onload = function() {
  var game; 
  const startOnePlayer = document.getElementById("start-1-player-game");
  startOnePlayer.onclick = function() {
    game = new RabbitGame(1400, 715);
    return game;
  };
};


/*   function startGame(playerNo) {
    switch (playerNo) {
      case "1p":
          return new RabbitGame(1400, 715);
    }
    //startOnePlayer.disabled = true;
  } */