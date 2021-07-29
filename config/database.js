let mongoose = require('mongoose');

module.exports = () => {
    /*
    let url = process.env.DB || 'mongodb://localhost:27017/livrosAPIRest';
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }

    mongoose.connect(url, options);

    mongoose.connection.once('open', ()=> {
        console.log('[Mongoose] Conectador em' + url);
    });

    mongoose.connection.on('error', (error) => {
        console.log('[Mongoose] Erro na conexão: ' + error);
    });
    */
    let url = process.env.DB || 'mongodb://localhost:27017/livrosAPIRest';
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }

    mongoose.connect(url, options);

    mongoose.connection.once('open', ()=> {
        console.log("[Mongoose] Conectado em" + url);
    });

    mongoose.connection.on('error', (error)=> {
        console.log("[Mongoose] Erro ba conexão: " + error);
    });

}