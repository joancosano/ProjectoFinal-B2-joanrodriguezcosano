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

        `<body>
            <main>
                <div class = "appContainer">
                    <button class = "newBtn">Nueva nota</button>
                    <div class = "notesContainer"></div>
                </div>
            </main>
        </body>`    

        this.appContainer = document.querySelector(".appContainer");
        this.notesContainer = document.querySelector(".notesContainer")
    };

}
