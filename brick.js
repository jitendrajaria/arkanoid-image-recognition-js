class Brick {
  constructor(x, y, color, width, height, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.type = this.type;
    this.isVisible = true;
  }

  draw() {
    if (this.isVisible) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}
