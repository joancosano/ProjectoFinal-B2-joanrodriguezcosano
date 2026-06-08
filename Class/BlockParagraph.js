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
            
            // añadimos un replace para conservar los saltos de linea dentro de un párrafo

             return `<div class="block" draggable="true" data-block-index="${index}">
                     <p>${this.content.replace(/\n/g, "<br>")}</p>
                </div>`
        }
       
        // añadimos un replace para conservar los saltos de linea dentro de un párrafo.

        return `<div class="block" draggable="true" data-block-index="${index}">
             <p>${this.content.replace(/\n/g, "<br>")}</p>
        </div>`

    }

    dictado(){

    }

}
