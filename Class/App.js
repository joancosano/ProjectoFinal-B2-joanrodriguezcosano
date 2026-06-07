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
    editingBlock = null;

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

            //listener de los editores de bloques
            const saveHeading = event.target.closest("[data-save-heading]");
            const saveParagraph = event.target.closest("[data-save-paragraph]");
            const saveImage = event.target.closest("[data-save-image]");
            const blockCard = event.target.closest(".block-card");

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

            if (saveHeading){
                this.saveHeading();
                return;
            }
            
            if (saveParagraph){
                this.saveParagraph();
                return;
            }

            if (saveImage){
                this.saveImage();
                return;
            }

            if(blockCard){
                const index = Number(blockCard.dataset.blockIndex);
                this.editingBlock = this.note.blocks[index];


                console.log(`editing: ${this.editingBlock.type}`);
                
                switch(this.editingBlock.type){
                    
                    case "heading": this.ui.showHeaderEditor(this.editingBlock);
                    break;
                    
                    case "paragraph": this.ui.showParagraphEditor(this.editingBlock);
                    break;
                    
                    case "image": this.ui.showImageEditor(this.editingBlock);
                    break;
                }
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

        const heading = new BlockHeading();
        this.ui.showHeaderEditor(heading);
        this.editingBlock = heading;
        console.log(this.note.blocks);
    
    }

    saveHeading(){

        this.editingBlock.content = document.querySelector("#headingContent").value;
        this.editingBlock.level = Number(document.querySelector("#headingLevel").value);
        this.editingBlock.color = document.querySelector("#headingColor").value.replace("#","");
        this.note.addBlock(this.editingBlock,this.note.blocks.length);
        this.editingBlock = null;
        this.saveNotes();
        this.ui.showEditor(this.note);
        console.log("saving heading")

    }

    addParagraph(){

        const paragraph = new BlockParagraph()
        this.ui.showParagraphEditor(paragraph);
        this.editingBlock = paragraph;
        console.log(this.note.blocks);
        return

    }

    saveParagraph(){

        this.editingBlock.content = document.querySelector("#paragraphContent").value;
        this.editingBlock.highlight = document.querySelector("#paragraphHighlight").checked;
        this.note.addBlock(this.editingBlock,this.note.blocks.length);
        this.editingBlock = null;
        this.saveNotes();
        this.ui.showEditor(this.note);
        console.log("saving Paragraph");

    }

    addImage(){

        // creamos una nueva instancia de BlockImage
        const image = new BlockImage();
        this.editingBlock = image;

        // mostramos el editor de imagenes en la interfaz y le pasamos la imagen
        this.ui.showImageEditor(image);
    }

    saveImage(){

        // Leemos las opciones configuradas por el usuario para el bloque de imagen.
        this.editingBlock.upscale = document.querySelector("#imageUpscale").checked;
        this.editingBlock.maxWidth = Number(document.querySelector("#imageMaxWidth").value);
        this.editingBlock.units = document.querySelector('input[name="units"]:checked').value;
        // Obtenemos el archivo seleccionado en el input type="file".
        const file = document.querySelector("#imageFile").files[0];

        if (!file){
         return;

        }

        // Creamos una instancia de la API global FileReader.
        const reader = new FileReader(); 

        // Esta función se ejecutará cuando el archivo termine de leerse.
        // La lectura es asíncrona, por eso el código que depende del archivo
        // debe estar dentro de onload.

        reader.onload = () => {

        // reader.result contiene la imagen convertida a una cadena Base64.
        this.editingBlock.content = reader.result;
        // Añadimos el bloque de imagen a la nota.
        this.note.addBlock(this.editingBlock, this.note.blocks.length);
        // Limpiamos la referencia al bloque temporal.
        this.editingBlock = null;
        // Guardamos las notas en localStorage.
        this.saveNotes();
        // Volvemos a renderizar el editor mostrando la nueva imagen.
        this.ui.showEditor(this.note);
    };

         // Inicia la lectura del archivo y lo convierte a Data URL (Base64).
         // Cuando termine, se disparará automáticamente el evento onload.
        reader.readAsDataURL(file);

}

    renderNotes(){
        this.ui.renderNotesList(this.notes)

    }

}