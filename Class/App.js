import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";
import { Note } from "./Note.js";
import { StorageAPI } from "../API/StorageAPI.js";
import { userInterface } from "./UserInterface.js";


export class App{

    notes = [];
    ui = null;

    constructor(){

        this.init()
    }

    init(){
        
        this.loadNotes();
        this.renderUI();
        this.listeners();
        this.renderNotes();
    }

    // método para leer todas las notas almacenadas en local storage
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

    // método para guardar todas las de nuevo en local storage
    saveNotes(){

         StorageAPI.save(this.notes.map(
            note => note.plain())
        )

    }

    // método para buscar la última ID de las notas creadas
    getNextNoteID(){

        if (this.notes.length === 0){
            return 1;
        }

        const ids = this.notes.map(note =>{
            return Number(note.id.replace("note_",""))
        })

        return Math.max(...ids) +1;
    }

    //método para renderizar la interfaz haciendo una instancia userInterface
    renderUI(){

        this.ui = new userInterface();

    }

    listeners(){

        // Creamos un listener para todo el contenedor
        const appContainer = this.ui.appContainer;

        appContainer.addEventListener("click", (event)=>{

            const noteCard = event.target.closest("[data-note-id]")
            const newButton = event.target.closest("[data-new-button]");
            const deleteButton = event.target.closest("[data-delete-button]")
            const backButton = event.target.closest("[data-back-button]");

            if (deleteButton){
                const noteID = noteCard.dataset.noteId;
                this.deleteNote(noteID);
                return
            }

            if (newButton){
                this.createNote();
                return
            }
            
            if (noteCard){
                const noteID = noteCard.dataset.noteId;
                this.openNote(noteID);
                return
            }

            if (backButton){
                this.ui.showNotesList();
                return;
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

        this.saveNotes();
        this.renderNotes();

        console.log("Nota creada:", note.id);

    }

    deleteNote(noteID){
        
        this.notes = this.notes.filter(note => note.id !== noteID);

        this.saveNotes();
        this.renderNotes();

        console.log("Nota borrada:")
        console.log(noteID)


    }

    openNote(noteID){

        console.log("openNote", noteID);
        const note = this.notes.find(note => note.id === noteID);
        
        if (!note){
            return;
        }
    
    this.ui.showEditor(note);
    console.log(note);
    
    }

    renderNotes(){
        this.ui.renderNotesList(this.notes)
    }

}