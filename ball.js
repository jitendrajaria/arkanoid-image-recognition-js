class Ball {
  constructor(color, radius, x, y, paddle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.paddle = paddle;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
