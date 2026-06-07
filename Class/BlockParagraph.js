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
    
    render(index){
        
        if (this.highlight){
             return `<div class="block-card" data-block-index="${index}">
                    <p class="highlight">${this.content}</p>
                </div>`
        }
       
        return `<div class="block-card" data-block-index="${index}">
            <p>${this.content}</p>
        </div>`

    }

    dictado(){

    }

}
