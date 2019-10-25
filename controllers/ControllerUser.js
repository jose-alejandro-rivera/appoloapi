const connect  = require('../connect.js')

module.exports.departament = async function(req, res, next) {
	try{
		let conection = await connect
		let sql = await conection.query('SELECT * FROM departamento')
		res.status(200).json({'status':200, 'data':sql.recordset})
	}catch(error){
		res.status(500).json({'status':200, 'error' : error.originalError})
	}
} 

module.exports.getUsers = async function(req, res, next) {
	try{
		let conection = await connect
		let sql = await conection.query('SELECT * FROM usuarios') // conection.query`SELECT * FROM usuarios WHERE nombre = ${value}`
		res.status(200).json({'status':200, 'data':sql.recordset})
	}catch(error){
		res.status(500).json({'status':500, 'error' : error.originalError})
	}
}

module.exports.getIdUsers = async function(req, res, next){
	try{
		let { id } = req.params
		let conection = await connect
		let sql = await conection.query`
			SELECT * FROM usuarios WHERE id = ${id}`
		res.status(200).json({'status':200, 'data':sql.recordset})
	}catch(error){
		res.status(500).json({'status':500, 'error' : error.originalError})
	}
}

module.exports.createUsers = async function(req, res, next){
	try{
		//console.log(req)
		let { nombre, apellido, usuario, password } = req.body
		//let users = "jonat12@hotmail.com"
		let conection = await connect
		let validateUser = await conection.query`SELECT * FROM usuarios WHERE usuario = ${usuario}`
		if(validateUser.recordset.length > 0 ){
			res.status(201).json({'status':201, 'msg' : "el correo ya se encuentra registrado"})
		}else{
			let insertUser = await conection.query`INSERT INTO usuarios (nombre, apellido, usuario, password) VALUES (${nombre}, ${apellido}, ${usuario}, ${password})`
			//console.log(insertUser)
			if(insertUser.rowsAffected.length > 0 ){
				res.status(201).json({'status':200, 'msg':'create'})
			}else{
				res.status(201).json({'status':201, 'msg':'error'})
			}
		}
	}catch(error){
		res.status(500).json({'status':500, error : error.originalError})
	}
}