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

    constructor(id,name,date_updated){
        this.id = id;
        this.name = name;
        this.date_created = new Date().toLocaleDateString();
        this.date_updated = new Date().toLocaleDateString();
    }

    addBlock(block,position){

    }

    removeBlock(position){

    }

    parse(jsonNote){

    }

    plain(){

    }

    render(){

    }

}