interface Image {
  imagePath: string,
  createImage(context: CanvasRenderingContext2D, xpos:number, ypos:number, width:number, height:number): void,
}

export default class drawImage implements Image{
  constructor(
    private _imagePath: string = '',
  ) {}

  get imagePath(): string { return this._imagePath; }
  set imagePath(imagePath:string) {this._imagePath = imagePath}

  createImage(context:CanvasRenderingContext2D, xpos:number, ypos:number, width:number = 20, height:number = 20){
    let myImage = document.createElement('img');
    myImage.src = this._imagePath;
    myImage.onload = function() {
      context.drawImage(myImage, xpos, ypos, width, height);
    };
  }
}

