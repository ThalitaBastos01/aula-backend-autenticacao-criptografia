const pool = require('../conexao')
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

        const { rows, rowCount} = await pool.query('select * from usuarios where id = $1', [id,

        ])

        if (rowCount < 1) {
            return res.status(401).json({mensagem: 'Não autorizado'})
        }
        // perfil do usuario
        req.usuario = rows[0]

        next()
    } catch (error) {
        return res.status(401).json({mensagem: 'Não foi autorizado'})
    }
}

module.exports = verificarUsuarioLogado