const app = require( '../bin/www' );

let chai = require( 'chai' );
let chaiHttp = require( 'chai-http' );
let expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use( chaiHttp );

let livroTest = {
    nomeLivro: "livro teste",
    qtdPaginas: "100"
}


describe("Teste de Livros na API REST", () => {

    it("Deve buscar todos os Livros", ( done ) => {
        chai.request( base_url )
        .get( '/livro/' )
        .end( ( err, res ) => {
            expect( res ).to.have.status( 200 );
            expect( res.body ).to.be.an( 'array' );
            done();
        });
    });

    it("Deve apresentar erro 404", ( done ) => {
        chai.request( base_url )
        .get( '/aaaa/' )
        .end( ( err, res ) => {
            expect( res ).to.have.status( 404 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.be.property( 'error' );
            done();
        });
    });

    it("Deve adicionar um novo Livro", ( done ) => {
        chai.request( base_url )
        .post( '/livro/' )
        .send( livroTest )
        .end( (err, res ) => {
            expect( res ).to.have.status( 201 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.have.property( 'livro' );
            livroTest._id = res.body.livro._id;
            done();
        });
    });

    it( "Deve editar um livro existente", ( done )=> {
        let livroEdit = {
            nomeLivro: "Livro Editado",

        }

        chai.request( base_url )
        .put( '/livro/'+livroTest._id )
        .send( livroEdit )
        .end( (err, res ) => {
            expect( res).to.have.status( 200 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.have.property( 'msg' )
            done();
        });
    });

    /*
    it( "Não deve editar um livro existente (Falta nome do Livro) ", ( done ) => {
        chai.request( base_url )
        .post( '/livro/' )
        .send( {"qtdPaginas": "000" } )
        .end( (err, res) => {
            expect(res).to.have.status( 500 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.have.property( 'error' );
            done();
        });
    });
    */
    

    it( "Deve retornar um livro existente e especifico", ( done ) => {
        chai.request( base_url )
        .get( '/livro/'+livroTest._id )
        .end( ( err, res ) => {
            expect(res).to.have.status( 200 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body.nomeLivro ).to.equal( "Livro Editado" );
            done();
        });
    });

    it( "Deve retornar um livro (ID não existe) ", ( done ) => {
        chai.request( base_url )
        .get( '/livro/+111' )
        .end( ( err, res ) => {
            expect( res ).to.have.status( 500 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.have.property( 'error' );
            done();
        });
    });

    it( "Deve remover um usuário existente", ( done ) => {
        chai.request( base_url )
        .delete( '/livro/'+livroTest._id )
        .end( (err, res) => {
            expect(res).to.have.status( 200 );
            expect( res.body ).to.be.an( 'object' );
            expect( res.body ).to.not.have.property( 'error' );
            done();
        } )
    })

});