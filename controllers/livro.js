
let Livro = require( '../models/Livro' );

module.exports = {
    
    getAllLivros: ( req, res, next ) => {
        Livro.find()
        .then(livros => {
            return res.status( 200 ).json( livros ); //se der tudo certo
        })
        .catch( error => {
            return res.status( 500 ).json( { msg: "Erro ao buscar usuário! ", error: error.message });
        });
    },

    getLivrosByID: async ( req, res, next ) => {
        let idLivros = req.params.id;

        try {
            let livro = await Livro.findById( idLivros );
            return res.status( 200 ).json( livro )
        }catch( error ) {
            return res.status( 500 ).json( { msg: "Erro ao buscar Livro! ", error: error.message });
        }
    },

    addLivro: async ( req, res, next ) => {
        let newLivro = new Livro();
        newLivro.nomeLivro = req.body.nomeLivro;
        newLivro.qtdPaginas = req.body.qtdPaginas;
        newLivro.usuario = req.body.usuario;

        try{
            let savedLivro = await newLivro.save();
            return res.status( 201 ).json( {msg: "Livro adicionado com sucesso", livro: savedLivro } );
        }catch( error ) {
            return res.status( 500 ).json( {msg: "Erro ao salvar usuário! ", error: error.message});
        }
    },

    updateLivro: async ( req, res, next ) => {
        let idLivro = req.params.id;
        
        let livroUpdate = {};
        if( req.body.nomeLivro ) livroUpdate.nomeLivro = req.body.nomeLivro;
        if( req.body.qtdPaginas ) livroUpdate.qtdPaginas = req.body.qtdPaginas;
        if( req.body.usuario ) livroUpdate.usuario = req.body.usuario;

        try {
            await Livro.updateOne({ _id:idLivro }, livroUpdate )
            return res.status( 200 ).json( {msg: "Livro atualizado com sucesso!"} );
        }catch( error ) {
            res.status( 500 ).json( {msg: "Erro ao atulizar Livro! ", error: error.message} );
        }
    },

    deleteLivro: ( req, res, next ) => {
        let idLivro = req.params.id;

        Livro.findByIdAndDelete(idLivro)
        .then(livroDeleted => {
            res.status( 200 ).json( {msg: "Livro removido com sucesso! ", livro: livroDeleted} );
        })
        .catch( error => {
            res.status( 500 ).json( {msg: "Erro ao remover Livro! ", error: error.message} );
        })
    }
}
















