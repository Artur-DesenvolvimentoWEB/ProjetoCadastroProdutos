import mongoose from 'mongoose';

const Produtos = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  marca:{
    type: String,
    required: true
  }, 
  categoria: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('produtos', Produtos);