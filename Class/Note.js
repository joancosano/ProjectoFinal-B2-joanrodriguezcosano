import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";

export class Note{

    id;
    name;
    date_created;
    date_updated;
    blocks;

    constructor(id,name,date_updated,blocks = []){
        
        this.id = id;
        this.name = name;
        this.date_created = new Date().toLocaleDateString();
        this.date_updated = new Date().toLocaleDateString();
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
        this.date_created = data.date_created;
        this.date_updated =  data.date_updated;
        this.blocks = data.blocks;
        
    }

    plain(){
        return JSON.stringify({
            id: this.id,
            name: this.name,
            date_created: this.date_created,
            date_updated: this.date_updated,
            blocks: this.blocks
        })

    }

    render(){

    }

}