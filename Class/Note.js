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

    }

    removeBlock(position){

    }

    parse(jsonNote){

        const data = JSON.parse(jsonNote);

        this.id = data.id;
        this.name = data.name;
        this.dateCreated = data.dateCreated;
        this.dateUpdated =  data.dateUpdated;
        this.blocks = data.blocks;
        
    }

    plain(){
        return JSON.stringify({
            id: this.id,
            name: this.name,
            dateCreated: this.dateCreated,
            dateUpdated: this.dateUpdated,
            blocks: this.blocks
        })

    }

    render(){

    }

}