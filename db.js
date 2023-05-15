const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const database = client.db('teste');
const user = database.collection('users');
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;


app.post('/signin', async (req, res) => {
    console.log(req.body);
    const dados = req.body;
    try {
        await client.connect();
        const query = {
          email: dados.email,
          senha: dados.password
        }; 
        await user.insertOne(query);
        //console.log(user);
      } catch(e){
        console.log(e);
      }
      res.send('Sucessfull sign in!');
      
  //res.send('Hello World!')
});

app.post('/login', async (req, res) => {
    const dados = req.body;
    const ver_email = await user.findOne({email: dados.email});
      if(!ver_email){
        console.log("\nUsuario nao encontrado!")
      }
      else{
        console.log("\nEMAIL CORRETO")
        console.log(dados.password)
        const ver_pass = await bcrypt.compare(dados.password, ver_email.senha);

        if(!ver_pass){
        console.log("\nSenha invalida!");
        }
        else{
        console.log("\nSENHA CORRETA, USUARIO LOGADO");
        }
      //const token = jwt.sign({email: dados.email},process.env.SECRET,{expiresIn: 600});
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

