//stiamo creando uno schema dal database 
import { Schema, model } from "mongoose";

//lo userschema ha bisogno di due argomenti, che sono 2 oggetti
//nel primo oggetto definiamo i campi del nostro database e i vincoli che hanno
//definiamo lo schema per coerenza di database, per trovarti dati che siano significativi
const userSchema = new Schema(
    {
    name: {
        type: String
    },
    email: {
        type: String, 
        unique: true, //rende la mail univoca
        required: true, //richiede che la mail sia presente
    },
    age: {
        //accetta valori di tipo number, con un minimo di 0 e un massimo di 99 
        type: Number,
        min: 0,
        max: 99,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    }, 
    approved: Boolean
},
{
    //definiamo il nome della collection, il nome al contenitore di documenti
    //la collection è un documento, un model
    collection: 'users'
})

//definiamo il nostro model, che ci permette di interagire con il nostro database
const User = model('User', userSchema)


export default User



