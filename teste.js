const Livro = require('./models/Livro');

let livro = new Livro();
livro.nomeLivros = "O poder do hábito";
livro.qtdPaginas = "100";

let error = livro.validateSync();
console.log(livro.nomeLivros);
console.log(livro.qtdPaginas);