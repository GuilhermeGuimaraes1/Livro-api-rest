
const mongoose = require( 'mongoose' );
let Schema = mongoose.Schema;

let livroSchema = new Schema({
  nomeLivro: {
    type: String,
    requerid: [ true, "O nome do Livro e obrigatório! " ],
  },
  qtdPaginas: {
    type: String,
    requerid: [ true, "A quantidade de páginas do livro e obrigátorio" ],
  },
  usuario: {
    type: String,
    requerid: [true, "O nome do usuário e obrigatorio. "]
  }
});

module.exports = mongoose.model( 'Livro', livroSchema );
