Vue.component({
    template : `div class="tarea"> 
                    <h3 class="visible">ToDoList Vanilla JS</h3>
                    <input type="text">
                    <a href="#" class="boton">editar</a>
                    <a href="#" class="boton">borrar</a>
                    <a href="#" class="estado"><span></span></a>
                </div> `
});
var todo = new Vue({
    el: ".contenedor",
    data : {
        tareas : [],
        tareaTemporal : "",
    },
    mounted(){
        ajax().then(datos => {
            this.tareas = datos;
            console.log(datos);
        });

    }
});