export class StorageAPI{

    static save(notes){
        localStorage.setItem
        ("notes",JSON.stringify(notes));
    }
    
    static load(){
        return JSON.parse(localStorage.getItem("notes"))
    }
}