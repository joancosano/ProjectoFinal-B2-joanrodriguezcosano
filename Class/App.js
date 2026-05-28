import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";
import { Note } from "./Note.js";
import { StorageAPI } from "../API/StorageAPI.js";

export class App{

    constructor(){

        this.noteID = 0;
        this.init()
        this.listener()
        this.renderNotes();
    }

    init(){

        // borramos body y creamos el contenedor para la app.
        document.body.innerHTML =

        `<main>
            <div class = "appContainer">
                <button class = "newBtn">Nueva nota</button>
                <div class = "notesContainer"></div>
            </div>
        </main>`

        this.appContainer = document.querySelector(".appContainer");
        this.notesContainer = document.querySelector(".notesContainer");
    }

    listener(){

        // Creamos un listener para todo el contenedor
        this.appContainer.addEventListener("click", (event)=>{

            const elementoPulsado = event.target;

            if (elementoPulsado.matches(".newBtn")){
                this.createNote();
            }

        })
    }

    createNote(){
        this.noteName = prompt("Título de la nota:");
        this.nota = new Note;
        this.nota.name = this.noteName;
        this.nota.id = `note_${this.noteID}`
        this.noteID++
        StorageAPI.save(this.nota)
        console.log(localStorage.getItem("notes"))
    }

    renderNotes(){
    }

}