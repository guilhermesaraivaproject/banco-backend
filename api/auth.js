const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const { use } = require('passport')

module.exports = app => {
    const signin = async (req, res) => {
        console.log("ENTRO LOGIN")
        if (!req.body.agencia || !req.body.conta || !req.body.password) {
            return res.status(200).send('Dados incompletos')
        }

        const user = await app.db('users') // COMO È BASEADO EM PROMISES usa o await para esperar voltar
            .where({agencia: req.body.agencia, conta: req.body.conta})
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(200).send("Senha Errada")
                }

                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret), // GERAR O TOKEN BASEADO NO ID E NO AUTH
                })
            })
        } else {
            res.status(200).send('Usuário não encontrado.')
        }
    }

    return { signin }
}