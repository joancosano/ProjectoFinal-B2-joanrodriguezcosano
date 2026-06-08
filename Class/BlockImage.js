import { Block } from "./Block.js";

export class BlockImage extends Block{

    upscale;
    units;
    maxWidth;

    constructor(content = "", upscale = true, units = "%", maxWidth = 100){

        super("image",content)

        this.upscale = upscale;
        this.units = units;
        
        if (!this.upscale) {

            this.maxWidth = "auto";

        } else if (this.units === "%") {

            this.maxWidth = 100;

        } else {

            this.maxWidth = maxWidth;
            
        }

    }

    parse(jsonBlock){

    const data = JSON.parse(jsonBlock);

    super.parse(jsonBlock);

        this.upscale = data.upscale;
        this.units = data.units;
        
        if (!this.upscale) {

            this.maxWidth = "auto";

        } else if (this.units === "%") {

            this.maxWidth = 100;

        } else {

            this.maxWidth = data.maxWidth;
            
        }

    }
    
   render(index){

    // comprobamos si upscale está activado. Si es así devolvemos siempre escala 100%. de lo contrario devolvemos los valores de escala y unidades.
    const style = this.upscale
        ? "width:100%;"
        : `max-width:${this.maxWidth}${this.units};`;

    return `
        <div data-block-index="${index}" draggable="true" class="block">
            <img src="${this.content}" style="${style}">
        </div>`;
}

}