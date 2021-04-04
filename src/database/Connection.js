
import mongoose from 'mongoose';

class Connection {
  constructor() {
    this.mongodb();
  }
  mongodb() {
    const uri = "mongodb+srv://admin:8YCI4M5VBgD0PuCp@cluster0.htd0z.gcp.mongodb.net/ProjetoCadastroProdutos?retryWrites=true&w=majority";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Conexão com o MongoDb realizada com sucesso!");
    }).catch((exception) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso" + exception);
    });
  }
}

export default new Connection();