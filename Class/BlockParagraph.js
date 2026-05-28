import { Block } from "./Block.js";

export class BlockParagraph extends Block{

    highlight

    constructor(content, highlight = false){

        super("paragraph",content)
        this.highlight = highlight
        
    }


    dictado(){
    }
    
    render(){ 
    }

    
}