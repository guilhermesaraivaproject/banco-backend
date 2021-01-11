const moment = require('moment')
const fs = require("fs")

module.exports = app => {
    const getTransacoes = (req, res) => {
        console.log('ENTRO getTransacoes ')
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('transacoes')
            .where({ userId: req.user.id })
            .orderBy('doneAt')
            .then(transacoes => res.json(transacoes))
            .catch(err => res.status(200).json(err))
    }

    const save = (req, res) => {
        if (!req.body.valor.trim()) {
            return res.status(200).send('Valor é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('transacoes')
            .insert(req.body)
            .then(() => updateSaldoUsuario(res, req.body.valor, req.body.tipo, req.body.userId))
            .catch(err => res.status(500).json(err))
    }

    const remove = (req, res) => {

        whereTransacao = app.db('transacoes').where({ id: req.params.id, userId: req.user.id })

        let valorTransacao
        let tipoTransacao
        let userIdTransacao

        whereTransacao.first().then(trans => {
            valorTransacao = trans.valor
            tipoTransacao = trans.tipo
            userIdTransacao = trans.user
        })

        whereTransacao.del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    updateSaldoUsuario(res, valorTransacao, tipoTransacao, userIdTransacao)
                } else {
                    const msg = `Não foi encontrado transacão com id ${req.params.id}.`
                    res.status(200).send(msg)
                }
            })
            .catch(err => res.status(500).json(err))
    }

    const updateSaldoUsuario = (res, valorTransacao, tipoTransacao, userIdTransacao) => {
        valorTrans = tipoTransacao == "TRANSF" ? valorTransacao : (valorTransacao*-1)
        console.log(valorTransacao, tipoTransacao, userIdTransacao)
        let saldoAtual
        app.db('users').where({ id: userIdTransacao }).first().then(user => {
            console.log(user)
            saldoAtual = user.saldo
        })
        app.db('users')
            .where({ id: userIdTransacao })
            .update({ saldo: saldoAtual+valorTrans })
            .then(() => res.status(204).send())
            .catch(err => res.status(200).send(err))
    }

    const addImageRef = (req, res) => {

        console.log(req.body)

        var base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
        
        fs.writeFile("public/image/imgRef"+req.body.id+".png", base64Data, 'base64', function(err) {
            if(!err) {
                app.db('transacoes')
                    .where({ id: req.body.id, userId: req.user.id })
                    .update({ imgRef: "/image/imgRef"+req.body.id+".png" })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(200).send(err))
            } else {
                res.status(200).send('Erro ao adicionar imagem.')
            }
        });

    }

    return { getTransacoes, save, remove, addImageRef }
}