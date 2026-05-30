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
        
        this.loadNotes();
        this.renderUI();
        this.listeners();
        this.renderNotes();
    }

    loadNotes(){

        //leemos todas las notas almacenadas en localStore
        const notesJson = StorageAPI.load() || [];
        //guardamos un Array con las notas como objeto de la case Note
        this.notes = notesJson.map(json =>{
            const note = new Note();
            note.parse(json);
            return note
        });
    }

    getNextNoteID(){

        if (this.notes.length === 0){
            return 1;
        }

        const ids = this.notes.map(note =>{
            return Number(note.id.replace("note_",""))
        })

        return Math.max(...ids) +1;
    }

    
    renderUI(){

        this.ui = new userInterface();

    }

    listeners(){

        // Creamos un listener para todo el contenedor
        const appContainer = this.ui.appContainer;
        const notesContainer = this.ui.notesContainer;

        appContainer.addEventListener("click", (event)=>{

            const noteCard = event.target.closest("[data-note-id]")
            const newButton = event.target.closest("[data-new-button]");
            const deleteButton = event.target.closest("[data-delete-button]")

            if (deleteButton){
                const noteID = noteCard.dataset.noteId;
                console.log("borrar botton:" + noteID)
                return
            }

            if (newButton){
                this.createNote();
                return
            }
            
            if (noteCard){
                const noteID = noteCard.dataset.noteId;
                console.log("nota pulsada:" + noteID)
                return
            }



        })
    }

    
    createNote(){

        //creamos una instancia de Note
        const note = new Note();
        //pedimos al usuario el nombre
        const noteName = prompt("Título de la nota:");

         if (!noteName) {

        return;

    }
        
        //rellenamos las propiedades
        note.name = noteName;
        note.id = `note_${this.getNextNoteID()}`;
        
        this.notes.unshift(note);

        StorageAPI.save(this.notes.map(
            note => note.plain()
        ));

        this.renderNotes();

        console.log("Nota creada:")
        console.log(localStorage.getItem("notes"));

    }

    renderNotes(){
        this.ui.renderNotesList(this.notes)
    }

}