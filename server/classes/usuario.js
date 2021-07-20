/*
formato de cada usuario
{
    id: 'sdsdsds-dsds',
    nombre: 'hector',
    salas: 'video juegos'
}*/
class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona); // se agrega al arreglo el usuario
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0]; // filter retorna un arreglo con los valores encontrados
        return persona; //si no encuentra retorna undefined
    }
    getPersonas() { // retorna todas las personas del chat
        return this.personas;
    }
    getPersonaPorSala(sala) {
        let personaEnSala = this.personas.filter(persona => persona.sala === sala);
        return personaEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id); // obtiene la persona antes de borrarla del arreglo personas
        // filter retorna un arreglo la condicion retorna todos con el id diferente del que viene dado
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
};