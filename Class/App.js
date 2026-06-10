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
    isNewBlock = false;
    draggedIndex = null;

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

    saveCurrentNote(){

        const index = this.notes.findIndex(note => note.id === this.note.id);
        this.notes[index] = this.note;
        
        this.originalNote = new Note();
        this.originalNote.parse(this.note.plain());
        
        this.saveNotes();
        this.ui.showEditor(this.note);

    }

    discardChanges(){
        
        this.note = new Note();
        this.note.parse(this.originalNote.plain());
        this.ui.showEditor(this.note);
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

        // listener de drag

        appContainer.addEventListener("dragstart", (event)=>{
            const block = event.target.closest(".block");
            if(!block) return;
            
            this.draggedIndex = Number(block.dataset.blockIndex);

        });
        
         // listener de arrastrar - para que funcione drop ha de esxistir el listener dragover y prevent default.

        appContainer.addEventListener("dragover", (event)=>{
            if(event.target.closest(".block")){
                event.preventDefault();
            }
        });

        // listener de soltar - guardamos el "indice target" es decir el indice destino

        appContainer.addEventListener("drop", (event)=>{
            
            const targetBlock = event.target.closest(".block");
            if(!targetBlock) return;
            const targetIndex = Number(targetBlock.dataset.blockIndex);
            this.moveBlock(this.draggedIndex, targetIndex);
        
        });


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
            const blockCard = event.target.closest(".block");

            //listener para borrar el bloque
            const deleteBlock = event.target.closest("[data-delete-block]");

            //listener para cerrar el editor
            const closeEditor = event.target.closest("[data-close-editor]");

            // listener para la edición del título de la nota
            const editNoteTitle = event.target.closest("[data-edit-note-title]");
            const saveNoteTitle = event.target.closest("[data-save-note-title]");

            // listener para el boton guardar / descartar cambios en la nota
            const noteMenuButton = event.target.closest("[data-note-menu]");
            const saveNote = event.target.closest("[data-save-note]");
            const discardNote = event.target.closest("[data-discard-note]");
            const startDictation = event.target.closest("[data-start-dictation]");

            
            if (deleteButton){
                const noteID = noteCard.dataset.noteId;
                this.deleteNote(noteID);
                return
            }

            if (newButton){
                this.createNote();
                return
            }

            if(editNoteTitle){
                this.editNoteTitle();
                return;
            }

            if(noteMenuButton){
                document.querySelector("#noteMenu").classList.toggle("hidden");
                return;
            }

            if(saveNote){
                this.saveCurrentNote();
                return;
            }

            if(discardNote){
                this.discardChanges();
                return;
            }

            if(saveNoteTitle){
                this.saveNoteTitle();
                return;
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

            if(startDictation){
                this.startDictation();
                return;
            }

            if(blockCard){
                const index = Number(blockCard.dataset.blockIndex);
                this.editingBlock = this.note.blocks[index];

                this.isNewBlock = false;

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


            if(deleteBlock){
                this.deleteBlock();
                return;
            }
            
            
            if(closeEditor){
                this.closeBlockEditor();
                return;
            }

            if(saveNote){
                this.saveCurrentNote();
                return;
            }

            if(discardNote){
                this.discardChanges();
                return;
            }

        })
    }
    
    editNoteTitle(){
        this.ui.showNoteTitleEditor(this.note);
    }
    
    saveNoteTitle(){
        this.note.name = document.querySelector("#noteTitleInput").value;
        this.ui.showEditor(this.note);
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
        
        this.originalNote = note;
        
        this.note = new Note();
        this.note.parse(note.plain());
           

        this.ui.showEditor(this.note);
        console.log(note);
    
    }

    moveBlock(fromIndex, toIndex){

    if(fromIndex === toIndex) return;

    // utilizamos el metodo splice para eliminar el bloque del indice original
    const block = this.note.blocks.splice(fromIndex, 1)[0];

    // utilizamos el metodo splice para insertar el bloque del indice de destino
    this.note.blocks.splice(toIndex,0,block);

    // la mostramos modificada
    this.ui.showEditor(this.note);

}
    addheading(){

        const heading = new BlockHeading();
        this.ui.showHeaderEditor(heading);
        this.editingBlock = heading;
        this.isNewBlock = true;
        console.log(this.note.blocks);
    
    }

    saveHeading(){

        this.editingBlock.content = document.querySelector("#headingContent").value;
        this.editingBlock.level = Number(document.querySelector("#headingLevel").value);
        this.editingBlock.color = document.querySelector("#headingColor").value.replace("#","");

        // solo volvemos a guardar el bloque en el caso que sea nuevo.

            if (this.isNewBlock){
                     this.note.addBlock(this.editingBlock,this.note.blocks.length);
                    }

        this.isNewBlock = false;
        this.editingBlock = null;
        
        this.ui.showEditor(this.note);console.log("saving heading")

    }

    addParagraph(){

        const paragraph = new BlockParagraph()
        this.ui.showParagraphEditor(paragraph);
        this.editingBlock = paragraph;
        this.isNewBlock = true;
        console.log(this.note.blocks);
        return

    }

    saveParagraph(){

        this.editingBlock.content = document.querySelector("#paragraphContent").value;
        this.editingBlock.highlight = document.querySelector("#paragraphHighlight").checked;

        if (this.isNewBlock){
            this.note.addBlock(this.editingBlock,this.note.blocks.length);
        }
        
        this.isNewBlock = false;
        this.editingBlock = null;
        
        this.ui.showEditor(this.note);
        console.log("saving Paragraph");

    }

    addImage(){

        // creamos una nueva instancia de BlockImage
        const image = new BlockImage();
        this.editingBlock = image;
        this.isNewBlock = true;

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

       
        // 

        if(!file){
            console.log(this.editingBlock);
            this.ui.showEditor(this.note);
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

            if (this.isNewBlock){
                this.note.addBlock(this.editingBlock, this.note.blocks.length);
            }

            this.isNewBlock = false;

        // Limpiamos la referencia al bloque temporal.
        this.editingBlock = null;
        
        // Volvemos a renderizar el editor mostrando la nueva imagen.
        this.ui.showEditor(this.note);
    };

         // Inicia la lectura del archivo y lo convierte a Data URL (Base64).
         // Cuando termine, se disparará automáticamente el evento onload.
        reader.readAsDataURL(file);
    
    }  
    
    deleteBlock(){

    const index = this.note.blocks.indexOf(this.editingBlock);
    
        if(index !== -1){
            this.note.blocks.splice(index,1);
        }

        this.editingBlock = null;
        this.ui.showEditor(this.note);
    
    }
    
    closeBlockEditor(){
        
        const editor = document.querySelector("#blockEditor");
        
        editor.innerHTML = "";
        editor.classList.add("hidden");
        document.querySelector("#editorOverlay").classList.add("hidden");
    
    }

    renderNotes(){
        this.ui.renderNotesList(this.notes)
    }

    startDictation(){

        // comprobamos que el navegador sea comatible con reconocimiento de voz

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if(!SpeechRecognition){
            alert("Tu navegador no soporta reconocimiento de voz");
            return;
        }

        // cramos una nueva instancia
        const recognition = new SpeechRecognition();

        // configuramos el reconococimiento de voz (idioma, escucha continua para evitar repetir frases, y no devolver resultados también para evitar repetir palabras.)
        recognition.lang = "es-ES";
        recognition.continuous = true;
        recognition.interimResults = false;

        // seleccionamos el contenedor del parrafo.
        const textarea = document.querySelector("#paragraphContent");

        //recogemos los resultados de la transcripción y lo guardamos en el contenido del parrafo. Tambíen sumandolo al texto del parrafo existente añadiento un espacio.
        recognition.onresult = (event)=>{

            const transcript = event.results[event.results.length - 1][0].transcript;

            textarea.value += (textarea.value ? " " : "") + transcript;
    };

    recognition.onerror = (event)=>{
        console.error("Error de reconocimiento:", event.error);
    };

    recognition.start();
    }

}