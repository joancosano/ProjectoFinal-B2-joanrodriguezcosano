export class Block{

    type;
    content;

    constructor(type,content){
        this.type = type;
        this.content = content;
    }

    render(){
        //Devolvemos un error si el metodo render() no está implementado.
        throw new Error ("render no implementado")
    }

    parse(jsonBlock){
        //guardamos el JSON de entrada de entrada y lo convertimos en un objeto de JS
        const input =  JSON.parse(jsonBlock);
        
        // verificamos que exista la propiedad type
        if(!input.type){
            throw new Error ("Typo de bloque no definido")
        }
        // verificamos que la info del typo bloque recibido corresponde con el typo de bloque de la instancia.
        if(input.type !== this.type){
            throw new Error ("Datos de entrada incorrectos, no corresponden con este bloque de texto")
        }

        //configuramos el bloque
        this.type = input.type;
        this.content = input.content;
    }

    plain(){
        // devuelve un JSON con toda la instancia
        return JSON.stringify(this);
    }
    
}