const express = require('express')
const {
	listarCarros,
	detalharCarro,
	cadastrarCarro,
	atualizarCarro,
	excluirCarro,
} = require('./controladores/carros')

const { cadastrarUsuario, login } = require('./controladores/usuarios')
const verificarUsuarioLogado = require('./intermediarios/autenticacao')


const rotas = express()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

// é nescessario que a verificação fique acima de todas as rotas que quero fazer essa autenticação. 
verificarUsuarioLogado()

rotas.get('/perfil', )

rotas.get('/carro', listarCarros)
rotas.get('/carro/:id', detalharCarro)
rotas.post('/carro',  cadastrarCarro)
rotas.put('/carro/:id', atualizarCarro)
rotas.delete('/carro/:id', excluirCarro)

module.exports = rotas
