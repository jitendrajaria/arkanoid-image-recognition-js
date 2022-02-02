class Paddle {
  constructor(width, height, color, x, y, velocity) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  moveRight() {
    this.x += this.velocity;
    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }
    this.draw();
  }
  moveLeft() {
    this.x -= this.velocity;
    if (this.x < 0) {
      this.x = 0;
    }
    this.draw();
  }
  moveTo(x) {
    if (x < 0) {
      this.x = 0;
    } else if (x > canvas.width) {
      this.x = canvas.width - this.width;
    }
    this.x = x;
  }
}
