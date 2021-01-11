module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/transacoes/listar').all(app.config.passport.authenticate()).get(app.api.transacoes.getTransacoes)
    app.route('/transacoes/salvar').all(app.config.passport.authenticate()).post(app.api.transacoes.save)
    app.route('/transacoes/:id/delete').all(app.config.passport.authenticate()).post(app.api.transacoes.remove)
    app.route('/transacoes/addImageRef').all(app.config.passport.authenticate()).post(app.api.transacoes.addImageRef)

}