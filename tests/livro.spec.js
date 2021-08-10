let chaiHttp = require('chai-http');
let expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

let livroTest = {
    nomeLivro: "livro teste",
    qtdPaginas: "100"
}


describe("Teste de Livros na API REST", () => {

    it("Deve buscar todos os Livros", (done) => {
        chai.request(base_url)
        .get('/livro/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });
});