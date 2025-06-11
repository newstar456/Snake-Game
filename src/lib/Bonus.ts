import GameField from '@lib/GameField';

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

  static bonusImages = [
    '/assets/bonuses/banana.png',
    '/assets/bonuses/cherry.png',
    '/assets/bonuses/lemon.png'
  ];

  static bonusValues = [10, 15, 20];

  static createRandom(snakeCoords: { x: number; y: number }[], field: GameField): Bonus {
    let x = 0, y = 0;
    const maxAttempts = 1000;    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      x = Math.floor(Math.random() * 40);
      y = Math.floor(Math.random() * 20);
      const cell = field.getCell(x, y);
      const occupied = snakeCoords.some(coord => coord.x === x && coord.y === y);
      if (cell?.isWalkable && !occupied) break;
    }    
    const imageSrc = Bonus.bonusImages[Math.floor(Math.random() * Bonus.bonusImages.length)];
    const value = Bonus.bonusValues[Math.floor(Math.random() * Bonus.bonusValues.length)];   
    return new Bonus(x, y, imageSrc, value);
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
