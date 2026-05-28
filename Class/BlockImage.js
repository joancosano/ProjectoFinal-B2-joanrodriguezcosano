import { Block } from "./Block.js";

export class BlockImage extends Block{

    upscale;
    units;
    maxWidth;

    constructor(content, upscale = true, units = "%", maxWidth){
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


    render(){
    }

}