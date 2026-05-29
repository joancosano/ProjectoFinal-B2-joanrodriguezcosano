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
                    <button class = "newBtn">Nueva nota</button>
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

}
