import express from "express";
//nome che uso per usare lo schema che ho usato nel user.js
import User from "../models/User.js";

//creiamo il router
const userRouter = express.Router();

//creiamo gli indirizzi, che definiamo con il metodo e il percorso
//questo /users mi restituisce la lista di tutti gli utenti
userRouter.get("/", async (req, res) => {
  //qui dobbiamo andare nel database e recuperare tutti gli utenti

  const page = req.query.page || 1;
  const perPage = req.query.perPage || 3;

  const users = await User.find({})
    //paginiamo
    //mongodb ci da sort - trova tutti gli utenti e ordinali  - se è 1 è crrescente, se è -1 è decrescente
    //Ci da anche limit - usato per limitare i record o documenti restituiti da una query, accetta solo un argomento di tipo numerico
    //possiamo anche usare il metodo skip - formula = (page - 1)*perPage

    .sort({ name: 1, age: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
    //aggiungiamo un campo totalPages che contiene il numero totale di pagine
    
    const totalResults = await User.countDocuments()
    const totalPages = Math.ceil(totalResults / perPage)
    res.send({
    dati: users,
    totalPages,
    totalResults,
    page,
    
  });
});

userRouter.get("/:userId", async (req, res) => {
  const id = req.params.useId;
  //qui dobbiamo andare nel database e recuperare i dati dell'utente con id pari a userId
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ message: "not found" });
  }
});

//definiamo rotta per creare un nuovo utente
userRouter.post("/", async (req, res) => {
  const userData = req.body;
  //chiedere al database di creare un nuovo utente
  const newUser = new User(userData);

  try {
    //devo salvare necessariamente
    const createdUser = await newUser.save();
    res.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "qualcosa non va" });
  }
});

//definiamo rotta per modificare un utente
userRouter.put("/:userId", async (req, res) => {
  const id = req.params.userId;
  const userData = req.body;
  //chiedere al database di aggiornare i dati dell'utente con id pari a userIdl
  try {
    await User.findByIdAndUpdate(id, userData);
    const user = await User.findById(id)
    res.send(user);
  } catch (err) {
    res.status(400).send();
  }
});

//definiamo rotta per eliminare un utente
userRouter.delete("/:userId", (req, res) => {
  // const userId = req.params.useId
  //chiedere al database di eliminare l'utente con id pari a userId
  const dataToModify = req.body;
  //TODO: implementare eliminazione  
});

export default userRouter;
