import { Block } from "./Block.js";

export class BlockHeading extends Block{

    level;
    color;

    constructor(level,color, content){
        super("heading",content)
        this.level = level;
        this.color = color;
    }

    render(){ 
    }

}