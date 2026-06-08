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

        
        const btnTitleEdit = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
        const backBtn = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <g opacity="0.4"> <path d="M9.00039 15.3802H13.9204C15.6204 15.3802 17.0004 14.0002 17.0004 12.3002C17.0004 10.6002 15.6204 9.22021 13.9204 9.22021H7.15039" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`
        const btnImg =` <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M16.2 21H6.93137C6.32555 21 6.02265 21 5.88238 20.8802C5.76068 20.7763 5.69609 20.6203 5.70865 20.4608C5.72312 20.2769 5.93731 20.0627 6.36569 19.6343L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21 15V16.2M16.2 21C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        const btnParagraph = `<svg width="30px" height="30px" fill="currentColor" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22,3a1,1,0,0,1-1,1H9A1,1,0,0,1,9,2H21A1,1,0,0,1,22,3ZM21,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0,6H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0,6H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path></g></svg>`
        const btnHeader = `<svg width="30px" height="30px" fill="currentColor" viewBox="-8 -7 24 24"preserveAspectRatio="xMinYMin" class="jam jam-header"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3z"></path></g></svg>`
        
        this.editorScreen.innerHTML = `

        <button data-back-button class="back-btn">${backBtn}</button>

        <div class="note-header">
            <h1 class="note-title-editor" id="noteTitle">${note.name}</h1>
            <button data-edit-note-title class="edit-title-btn">${btnTitleEdit}</button>
        </div>

        <div class="editor-content">
            
            ${note.render()}
        
        </div>
        
        <div id="editorOverlay" class="hidden"></div>

        <div>
            <div id="blockEditor" class="hidden"></div>
            
            <div class="editor-actions">
            <button data-add-heading>${btnHeader}</button>
            <button data-add-paragraph>${btnParagraph}</button>
            <button data-add-image>${btnImg}</button>

        </div>
        </div>
        `;
    }
    
    showHeaderEditor(heading){

        const editor = document.querySelector("#blockEditor");
        const overlay = document.querySelector("#editorOverlay");

        // elimina la clase "hidden" del editor para mostrarla encima de la nota
        overlay.classList.remove("hidden");
        editor.classList.remove("hidden");

        editor.innerHTML = `

            <div class="editor-panel">
                <h2>Edición de cabecera</h2>
                    <div id="headingPreview" style="color:#${heading.color}">
                    <h${heading.level}>${heading.content}</h${heading.level}>
                    </div>
            <div class="header-options">
            
            <label>Tamaño
                <select id="headingLevel">
                    <option value="1" ${heading.level === 1 ? "selected" : ""}>H1</option>
                    <option value="2" ${heading.level === 2 ? "selected" : ""}>H2</option>
                    <option value="3" ${heading.level === 3 ? "selected" : ""}>H3</option>
                </select>
            </label>

            <label>Color
                <input id="headingColor" type="color" value="#${heading.color}">
            </label>

            </div>
                <input id="headingContent" type="text" value="${heading.content}" placeholder="Texto de la cabecera">
                    <div class="editor-panel-buttons">
                        <button class="modal-btn btn-save" data-save-heading>Guardar</button>
                        <button class="modal-btn btn-delete" data-delete-block>Eliminar cabecera</button>
                        <button class="modal-btn btn-cancel" data-close-editor>Cancelar</button>
                    </div>
            </div>
            `;

    }
      
    showParagraphEditor(paragraph){
    
        const blockEditor = document.querySelector("#blockEditor");
        const overlay = document.querySelector("#editorOverlay");
    
        overlay.classList.remove("hidden");
        blockEditor.classList.remove("hidden");

        blockEditor.innerHTML = `
        
        <div class="editor-panel">
            <h2>Edición de párrafo</h2>
            <textarea id="paragraphContent">${paragraph.content}</textarea>
        
            <label class="checkbox-label">
                <input id="paragraphHighlight" type="checkbox" ${paragraph.highlight ? "checked" : ""}>
                Highlight
                </label>

            <div class="editor-panel-buttons"><button class="modal-btn btn-save" data-save-paragraph>Guardar</button>
                <button class="modal-btn btn-delete" data-delete-block>Eliminar párrafo</button>
                <button class="modal-btn btn-cancel" data-close-editor>Cancelar</button>
            </div>

        </div>
        
        `;
    }

    showImageEditor(image){

        const editor = document.querySelector("#blockEditor");
        const overlay = document.querySelector("#editorOverlay");

        overlay.classList.remove("hidden");
        editor.classList.remove("hidden");

        editor.innerHTML = `
        
        <div class="editor-panel">

            <h2>Edición de imagen</h2>

            ${image.content ? `<img src="${image.content}" class="image-preview">`: ""}

            <div class="form-row">

                <label>Archivo</label>
                <input type="file" id="imageFile" accept="image/*"></div>
            
                <div class="form-row">
                    <label class="checkbox-label"> <input  type="checkbox" id="imageUpscale" ${image.upscale ? "checked" : ""}> Upscale</label>
                </div>

            <h3>Unidades</h3>
            <div class="form-row units-row">
                <label><input type="radio" name="units" value="px" ${image.units === "px" ? "checked" : ""}>px</label>
                <label><input type="radio" name="units" value="%" ${image.units === "%" ? "checked" : ""}>%</label>
            </div>

            <div class="form-row">
                <label>Ancho máximo</label>
                <input id="imageMaxWidth" type="number" value="${image.maxWidth === "auto" ? "" : image.maxWidth}">
            </div>

            <div class="editor-panel-buttons"><button data-save-image class="modal-btn btn-save"> Guardar</button>
                    <button data-delete-block class="modal-btn btn-delete">Eliminar imágen</button>
                    <button data-close-editor class="modal-btn btn-cancel">Cancelar</button>
            </div>
            
            </div>
    `;
    
        editor.classList.add("visible");
    
    }

    showNoteTitleEditor(note){
        
        const editor = document.querySelector("#blockEditor");
        const overlay = document.querySelector("#editorOverlay");

        overlay.classList.remove("hidden");
        editor.classList.remove("hidden");

        editor.innerHTML = `

            <h2>Edición de título</h2>
            <input id="noteTitleInput" type="text" value="${note.name}">
        
            <div class="editor-panel-buttons">
                <button data-save-note-title class="modal-btn btn-save">Guardar</button>
                <button data-close-editor class="modal-btn btn-cancel">Cancelar</button>
            </div>
        `;

    }

}
