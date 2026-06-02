export class userInterface{
    
    constructor(){
        this.renderLayout()
    }
    
    renderLayout(){
        this.createNotesContainer();
    }
    
    createNotesContainer(){

        // borramos body y creamos el contenedor para la app.
        document.body.innerHTML =

        `<main>
            <div id = "appContainer" class = "appContainer">

                <section id= "notesContainer">
                    <button data-new-button class = "newBtn">Nueva nota</button>
                    <div class = "notesContainer"></div>
                </section>

                <section id="editorScreen" class = "hidden">
                </section>

            </div>
        </main>
        `    

        this.appContainer = document.querySelector("#appContainer");
        this.editorScreen = document.querySelector("#editorScreen");
        this.notesScreen = document.querySelector("#notesContainer");
        this.notesContainer = document.querySelector(".notesContainer");
    };
    
    renderNotesList(notesList){

    //html del icono de la papelera vectorial "svg" que usaremos con el metodo innerHTML para reemplazar el boton "standard" del navegador.
    const btnDelete = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 
    10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 
    3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 
    4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>`


    //renderizamos cada nota dentro del array recibido en noteList y usamos template literals para crear cada nota. 
     let notesCards = "";
     
     notesList.forEach(note => {

        notesCards +=

        `<div class = "note-card" data-note-id ="${note.id}">

        <div>

            <div class = "note-date">${note.dateCreated}</div>
            <h3 class = "note-title">${note.name}</h3>

        </div>

        <button class = "delete-button" data-delete-button>${btnDelete}</button>

        </div>`;

    })

    this.notesContainer.innerHTML = notesCards;

    }

    showNotesList(){
        this.editorScreen.classList.add("hidden");
        this.notesScreen.classList.remove("hidden");
    }


    showEditor(note){
        
        this.notesScreen.classList.add("hidden");
        this.editorScreen.classList.remove("hidden");
        
        this.editorScreen.innerHTML = 
        
        `
        <button data-back-button>← Volver</button>
            <h1>${note.name}</h1>
        <div class="editor-content">
            
            ${note.render()}
        
        </div>
        
        <div>

        <div id="blockEditor"></div>

        <button data-add-heading>Añadir cabezera</button>
        <button data-add-paragraph>Añadir párrafo</button>
        <button data-add-image>Añadir imagen</button>
        
        </div>
        `;
    }

        showHeaderEditor(heading){
        
        this.notesScreen.classList.add("hidden");
        this.editorScreen.classList.remove("hidden");
        
        this.editorScreen.innerHTML = 
        
        `
        <button data-back-button>← Volver</button>
            <h1>${note.name}</h1>
        <div class="editor-content">
        
        </div>
        
        <div>
        
        <button data-add-heading>Añadir cabezera</button>
        <button data-add-paragraph>Añadir párrafo</button>
        <button data-add-image>Añadir imagen</button>
        
        </div>
        `;
    }
    
        showParagraphEditor(paragraph){
            
            const blockEditor = document.querySelector("#blockEditor");
            
            blockEditor.innerHTML = 
            
            `<div class="editor-panel">
            
            <h3>Editar párrafo</h3>
            
            <textarea>

            ${paragraph.content}

            </textarea>
                    <button>Guardar</button>
            </div>

    `;

}

}
