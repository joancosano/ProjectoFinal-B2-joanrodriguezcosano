import { Block } from "./Block.js";

export class BlockParagraph extends Block{

    highlight;
   
    constructor(content = "", highlight = false,){
        super("paragraph", content);

        this.highlight = highlight;
        
    }

    parse(jsonBlock){
        const data = JSON.parse(jsonBlock);
        super.parse(jsonBlock);
        this.highlight = data.highlight
    }
    
    render(){         
        return this.highlight
        ? `<p class="highlight">${this.content}</p>`
        : `<p>${this.content}</p>`;

    }

    dictado(){

    }

}
