const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const segredo = require('../config/chaveToken');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    token: {
        type: String,
    },
    group: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', function(next) {
    const usuario = this;

    if(usuario.isModified('password') || usuario.isNew) {

        bcrypt.hash(usuario.password, 8)
        .then(hash => {
            usuario.password = hash;
            next();
        })
        .catch(error => {
            next(error);
        })
    }
});  

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return cb(err);
        else cb(null, isMatch);
    });
}

//gerar um token
userSchema.methods.generateAuthToken = function() {
    return new Promise((sucess, reject) => {
        const usuario = this;

        const token = jwt.sign(
            {_id: usuario._id},
            segredo.segredoToken,
            {expiresIn: '7d'}
        );

        usuario.token = token;

        usuario.save()
        .then(user => {
            sucess({sucess: true, token: token})
        })
        .catch(error => {
            reject({sucess: false, token: null, error: error.massage})
        });
    });
}

module.exports = mongoose.model('User', userSchema);