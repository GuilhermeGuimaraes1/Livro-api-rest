const jwt = require('jsonwebtoken');
const segredo = require('../config/chaveToken');
const User = require('../models/User');

module.exports = {
    jwtVerify: (req, res, next) => {
        let authorizationHeader = req.headers['autorization'];
        if(authorizationHeader) {
            var token = authorizationHeader.replace('Bearer', '');
        }else {
            return res.status(401).json({
                sucess: false,
                msg: "O envio do token e obrigatorio"
            });
        }

        if(token) {
            jwt.verify(token, segredo.segredoToken, function(err, tokenDecoded){
                if(err) {
                    return res.status(500).json({
                        sucess: false,
                        msg: "Falha ao verificar o token. Tente novamente!"
                    });
                }else {
                    let userId = tokenDecoded._id;

                    User.findOne({
                        _id: userId,
                        token: token
                    }, {username: 1, group: 1, _id: 1})
                    .then(user => {
                        if(user) {
                            req.user = user;
                            next();
                        }else {
                            return res.status(401).json({
                                sucess: false,
                                msg: "Token não encontrado. Faça o Login novamente"
                            })
                        }
                    })
                    .catch(error =>{
                        return res.status(401).json({
                            sucess: false,
                            msg: "Token Inválido",
                            error: error.message
                        })
                    })
                }  
            });
        }else {
            return res.status(401).json({
                sucess: false,
                msg: "O envio do token é obrigatório!"
            })
        }
    },

    groupVerify: (role) => {
        return function(req, res, next) {
            if(role != null && role.includes(req.user.group)) {
                next();
            }else {
                res.status(403).json({
                    sucess: false,
                    msg: "O usuário não tem acesso a esta rota! "
                })
            }
        }
    }
}