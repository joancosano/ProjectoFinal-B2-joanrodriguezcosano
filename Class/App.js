import { Block } from "./Block.js";
import { BlockHeading } from "./BlockHeading.js";
import { BlockImage } from "./BlockImage.js";
import { BlockParagraph } from "./BlockParagraph.js";
import { Note } from "./Note.js";
import { StorageAPI } from "../API/StorageAPI.js";
import { userInterface } from "./UserInterface.js";


export class App{

    notes = [];
    note = null;
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

            //listeners para la seccion listas de notas.
            const noteCard = event.target.closest("[data-note-id]")
            const newButton = event.target.closest("[data-new-button]");
            const deleteButton = event.target.closest("[data-delete-button]")

            //listeners para la seccion de edición de nota.
            const backButton = event.target.closest("[data-back-button]");
            const addHeading = event.target.closest("[data-add-heading]");
            const addParagraph = event.target.closest("[data-add-paragraph]");
            const addImage = event.target.closest("[data-add-image]");

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
            
            if (addHeading){
                console.log("adding head");
                this.addheading();
                return;
            }

            if (addParagraph){
                this.addParagraph();
                console.log("adding paragraph")
                return;
            }

            if (addImage){
                this.addImage();
                console.log("adding image")
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

    this.note = note;

    this.ui.showEditor(note);
    console.log(note);
    
    }


    addheading(){

        const heading = new BlockHeading(1,"000000","Encabezado");
        this.note.addBlock(heading, this.note.blocks.length);
        this.ui.showHeaderEditor(heading);
        console.log(this.note.blocks);
    
    }

    addParagraph(){

        const paragraph = new BlockParagraph("texto del parrafo",false)
        this.note.addBlock(paragraph, this.note.blocks.length);
        this.ui.showParagraphEditor(paragraph);
        console.log(this.note.blocks);
        
        return

    }


    addImage(){

        const image = new BlockImage("image",true,"%",50)
        this.note.addBlock(image, this.note.blocks.length);
        this.ui.showImageEditor(image);
        console.log(this.note.blocks);

    }


    renderNotes(){
        this.ui.renderNotesList(this.notes)

    }

}