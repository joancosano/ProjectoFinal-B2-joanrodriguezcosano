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
            <div class = "appContainer">

                <section id= "notesContainer">
                    <button data-new-button class = "newBtn">Nueva nota</button>
                    <div class = "notesContainer"></div>
                </section>

                <section id="editorScreen" class = "hidden">
                </section>

            </div>
        </main>
        `    

        this.appContainer = document.querySelector(".appContainer");
        this.notesContainer = document.querySelector(".notesContainer")
    };

renderNotesList(notesList){

    this.notesContainer.innerHTML="";

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
        deleteButton.textContent = "Delete";
      
        titleContainer.append(noteDateCreated);
        titleContainer.append(noteTitle);
        
        noteCard.append(titleContainer);
        noteCard.append(deleteButton);

        this.notesContainer.append(noteCard)

    });
    }    

}
