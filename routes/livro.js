var express = require( 'express' );
var router = express.Router();
let controller = require( '../controllers/livro' );


router.get( '/', controller.getAllLivros );
router.get( "/:id", controller.getLivrosByID );
router.post( '/', controller.addLivro );
router.put( '/:id', controller.updateLivro );
router.delete( '/:id', controller.deleteLivro );


module.exports = router;
