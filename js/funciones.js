Vue.component("tarea",{
    data : function(){
        return {
            editando : false
        }
    },
    props : ["id","tarea","terminada"],
    template : `<div class="tarea"> 
                    <h3 :class="[ !editando ? 'visible' : null ]">{{tarea}}</h3>
                    <input type="text" :class="[ editando ? 'visible' : null ]" v-model="tarea">
                    <a href="#" class="boton" @click.prevent="editando = !editando">{{ editando ? 'guardar' : 'editar' }}</a>
                    <a href="#" class="boton">borrar</a>
                    <a href="#" :class="['estado', terminada ? 'terminada' : null ]"
                    @click.prevent="$emit('toggle',id)"><span></span></a>
                </div> `
});
var todo = new Vue({
    el: ".contenedor",
    data : {
        tareas : [],
        tareaTemporal : "",
    },
    methods : {
        toggleEstado(id){
            ajax('PUT',{ id : id, operacion : 2})
            .then(datos =>{
                if(datos.resultado == "ok"){
                    this.tareas = this.tareas.map(item => {
                       item.terminada = item.id == id ? !item.terminada : item.terminada
                       return item;
                    });

                }
            });
            //console.log(id)
        }
    },
    mounted(){
        ajax().then(datos => {
            this.tareas = datos.map(item =>{
                item.terminada = !!Number(item.terminada)
                return item;
            });
            //console.log(this.tareas[0].terminada);
        });
    }
});
