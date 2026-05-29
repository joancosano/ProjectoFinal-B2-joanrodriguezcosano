import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";
import { Note } from "./Note.js";
import { StorageAPI } from "../API/StorageAPI.js";
import { userInterface } from "./UserInterface.js";

export class App{

    constructor(){

        this.init()
    }

    init(){
        
        this.renderUI();
        this.listeners();
        this.renderNotes();
    }

    
    renderUI(){

        this.ui = new userInterface();

    }

    listeners(){

        // Creamos un listener para todo el contenedor
        const appContainer = this.ui.appContainer;
        const notesContainer = this.ui.notesContainer;

        appContainer.addEventListener("click", (event)=>{

            const elementoPulsado = event.target;

            if (elementoPulsado.matches(".newBtn")){
                this.createNote();
            }

        })
    }

    createNote(){

        this.noteID = 0;
        this.noteName = prompt("Título de la nota:");
        this.note = new Note;
        this.note.name = this.noteName;
        this.note.id = `note_${this.noteID}`
        this.noteID++
        StorageAPI.save(this.note)
        console.log("Nota creada:")
        console.log(localStorage.getItem("notes"))
    }

    renderNotes(){
    }

}