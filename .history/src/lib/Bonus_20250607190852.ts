export default class Bonus {
  x: number;
  y: number;
  imageSrc: string;
  value: number;

  constructor(x: number, y: number, imageSrc: string, value:number) {
    this.x = x;
    this.y = y;
    this.imageSrc = imageSrc;
    this.value = value;
  }

  async draw(ctx: CanvasRenderingContext2D, size: number) {
    const img = new Image();
    img.src = this.imageSrc;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    ctx.drawImage(img, this.x * size, this.y * size, size, size);
  }
}
