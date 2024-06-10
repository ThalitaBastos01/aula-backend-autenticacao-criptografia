const jwt = require('jsonwebtoken')
const senhaJwt = require('../senha.jwt')


const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({mensagem: 'Não autorizado'})
	}

	const token = authorization.split(' ')[1]

    try {
        // verificação de autenticação de token
        const { id } = jwt.verify(token, senhaJwt)

        const usuario = await pool.query('select * from usuarios where id = $1', [id])

        if (!usuario) {
            return res.status(401).json({mensagem: 'Não autorizado'})
        }

        next()
    } catch (error) {
        return res.status(401).json({mensagem: 'Não foi autorizado'})
    }
}

module.exports = verificarUsuarioLogado