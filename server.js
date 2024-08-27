//da qui parte tutto, importiamo le librerie che ci servono
//in models inseriamo gli schema, che sono strutture
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import userRouter from './router/user.router.js';
//metti la porta in una variabile, viene 
const port = process.env.port || 5000

//creiamo una istanza base del database 
const app = express();

//connettiamoci a mongoose tramite stringa di connessione
//vai su mongodb poi schiaccia connect, drivers, mongoose e copia la stringa 
await mongoose.connect(process.env.MONGO_STRING)
.then(()=> console.log('database connesso'))
.catch((err)=>console.log(err))


//sappiamo che abbiamo dei body in json che deve convertire in js 
app.use(express.json()); 

//Facciamo un file a parte con scopo di contenere solo gli indirizzi - la chiamiamo router o routes

app.use('/users', userRouter)


//avviamo il server, mettiamolo in ascolto 
//posso passare una callback, si sfrutta per fare un console log 
app.listen(port, ()=> {
    console.log(`server avviato su ${process.env.HOST}:${port}`) //messaggio molto utile per operazioni asincrone. 
})
