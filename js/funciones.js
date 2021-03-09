Vue.component("tarea",{
    data : function(){
        return {
            
            tareaEditada : this.tarea
        }
    },
    props : ["id","tarea","terminada","editando"],
    methods : {
        editarTarea(){
            if(this.editando){
                //guardar
                if(this.tareaEditando != this.tarea){
                    this.$emit("guardar", this.id, this.tareaEditada);
                }else{
                    this.editando = false;
                }
            }else{
                //editar
                this.editando = true
            }
        }
    },
//boton cambiar tarea que se cambie a editando
//que se guarde tarea al guardar
    template : `<div class="tarea"> 
                    <h3 :class="[ !editando ? 'visible' : null ]">{{tarea}}</h3> 
                    
                    <input type="text" :class="[ editando ? 'visible' : null ]" v-model="tareaEditada">
                    
                    <a href="#" class="boton" @click.prevent="editarTarea">{{ editando ? 'guardar' : 'editar' }}</a>
                    
                    <a href="#" class="boton" @click.prevent="$emit('borrar', id)">borrar</a>
                    
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

        crearTarea(tarea){
            console.log(tarea)
            ajax('POST', { tarea : tarea })
            .then(datos =>{
                if(datos.resultado == "ok"){
                    this.tareas.push({
                        id : datos.id, 
                        tarea : tarea,
                        terminada : false 
                    });
                    this.tareaTemporal = "";
                }
            });
        },
        guardarTarea(id,tarea){
            ajax("PUT", { id : id, tarea : tarea, operacion : 1 })
            .then(datos => {
                if(datos.resultado == "ok"){
                    
                    //console.log("editado")
                    this.tareas = this.tareas.map(item => {
                        item.id  == id ? item.tarea = tarea : null;
                        return item;
                    })
                }
            });
        },

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
        },
        borrarTarea(id){
            ajax('DELETE', { id : id })
            .then(datos =>{
                if(datos.resultado === "ok"){
                    this.tareas = this.tareas.filter(item => item.id != id)
                }
            });
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
