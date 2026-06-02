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
    
    render(){

    if (this.maxWidth === "auto") {
        return `<img src="${this.content}">`;

    }

    return `<img src="${this.content}" style="max-width:${this.maxWidth}${this.units}">`;

    }

}