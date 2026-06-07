import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";

export class Note{

    id;
    name;
    dateCreated;
    dateUpdated;
    blocks;

    constructor(id,name,dateUpdated,blocks = []){
        
        this.id = id;
        this.name = name;
        this.dateCreated = new Date().toLocaleDateString();
        this.dateUpdated = new Date().toLocaleDateString();
        this.blocks = blocks;
    }

    addBlock(block,position){
        this.blocks.splice(position, 0, block);
    }

    removeBlock(position){
    this.blocks.splice(position, 1);
    }

    parse(jsonNote){

        const data = JSON.parse(jsonNote);

        this.id = data.id;
        this.name = data.name;
        this.dateCreated = data.dateCreated;
        this.dateUpdated =  data.dateUpdated;
        this.blocks = [];

        for (const blockData of data.blocks) {

            let block;
            
            switch (blockData.type) {
                case "heading":
                    block = new BlockHeading();
                    break;
                    
                case "paragraph":
                    block = new BlockParagraph();
                    break;
                    
                case "image":
                    block = new BlockImage();
                    break;
                
                default:

                throw new Error(`Tipo de bloque desconocido: ${blockData.type}`);
            }
        
            block.parse(JSON.stringify(blockData));
            this.blocks.push(block);
    }

    
}

    plain(){

        return JSON.stringify({
            id: this.id,
            name: this.name,
            dateCreated: this.dateCreated,
            dateUpdated: this.dateUpdated,
            blocks: this.blocks.map(block => JSON.parse(block.plain()))
        })

    }

    render() {
        
        // Recorremos todos los bloques de la nota y llamamos
        // al método render() de cada uno de ellos.
        // map() devuelve un array con el HTML generado por cada bloque.
        // join("") une todos esos fragmentos HTML en un único string.
        // pasamos el parámetro index para poder localizar el bloque en el caso que el usuario quiera editarlo.

        return this.blocks.map(
            (block,index) => block.render(index)
        ).join("");

    }

}