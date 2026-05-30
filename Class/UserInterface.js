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

    //borramos todo el contenedor de notas
    this.notesContainer.innerHTML="";

    //html del icono de la papelera vectorial "svg" que usaremos con el metodo innerHTML para reemplazar el boton "standard" del navegador.
    const btnDelete = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 
  10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 
  3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 
  4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>`


    //renderizamos cada nota dentro del array recibido en noteList.
     notesList.forEach(note => {

        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.dataset.noteId = note.id;

        const titleContainer = document.createElement("div");
        const noteTitle = document.createElement("h3");
        noteTitle.classList.add("note-title");
        noteTitle.textContent = note.name;

        const noteDateCreated = document.createElement("div");
        noteDateCreated.classList.add("note-date");
        noteDateCreated.textContent = note.dateCreated;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.deleteButton = "";
        deleteButton.innerHTML = btnDelete;
      
        titleContainer.append(noteDateCreated);
        titleContainer.append(noteTitle);
        
        noteCard.append(titleContainer);
        noteCard.append(deleteButton);

        this.notesContainer.append(noteCard)
    
    });
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
        </div>
        <div>
        <button data-add-heading>Añadir cabezera</button>
        <button data-add-paragraph>Añadir párrafo</button>
        <button data-add-image>Añadir imagen</button>
        </div>
        `;
    }

}
