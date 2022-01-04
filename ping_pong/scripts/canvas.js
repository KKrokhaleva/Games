export class Canvas {
    constructor (w = 648, h = 480){
        this.element = document.createElement("canvas");
        this.context = this.element.getContext("2d");
        this.element.width = w;
        this.element.height = h;
        document.querySelector("#game").append(this.element);
    }
    fill(color) {
        this.context
    }
}