function ajax(metodo, datos){
    var configuracion = !datos ? null : {
        method : metodo, 
        body : JSON.stringify(datos),
        headers : {
            "Content-type" : "application/json"
        }
    } 
    return fetch("../api_todo/", configuracion)
        .then(res => res.json());
}