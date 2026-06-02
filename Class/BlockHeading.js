import { Block } from "./Block.js";

export class BlockHeading extends Block{

    level;
    color;


   constructor (level = 1, color = "000000", content = ""){
        super("heading",content)
        this.level = level;
        this.color = color;
  
    }

    parse(jsonBlock){

        const data = JSON.parse(jsonBlock);

        super.parse(jsonBlock);

        this.level = data.config.level;
        this.color = data.config.color;
    }

    render(){ 
    return `<h${this.level} style="color:#${this.color}">${this.content}</h${this.level}>`;
    }

    plain(){

    return JSON.stringify({
            type: this.type,
            content: this.content,
            config:{
            level: this.level,
            color: this.color
        }
    });

}
}