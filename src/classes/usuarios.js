class Usuarios{
    constructor() {
        this.personas = [];

    }

    agregarPersona(id,nombre,sala){
        let persona = {id,nombre,sala}
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(persona=>{
            return persona.id === id;
        })[0];
        //si no encuentra a nadie, envia un undefined
        return persona;
    }
    getPersonas(){
        return  this.personas;
    }

    getPersonaPorSala(sala){
        let personasEnSala = this.personas.filter(persona=>{
            return persona.sala===sala;
        })
        return personasEnSala;
    }
    //remover personas del chat

    borrarPersona(id){
        let personaBorrada = this.getPersona(id)
        this.personas = this.personas.filter(persona => {
            return persona.id !== id
        });

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}