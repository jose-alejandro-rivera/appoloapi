const connexion = require('../connect.js')
var Fecha = new Date();
var Usuario = 'soporte';

module.exports.initFlujo = async function(req, res, next){
	try{
		let getConnection = await connexion.getConnection();
		let sql = await getConnection.query`SELECT * FROM categoriaFlujo`
		let sql2 = await getConnection.query`SELECT * FROM paso`
		var data = {
			categorias: sql.recordset,
			pasos: sql2.recordset
		};
		res.status(200).json({'status':200, 'data': data}
		)
	}catch(error){
		res.status(500).json({'status':500,'error' : error.originalError}
		)
	}
}

module.exports.crearFlujo = async function(req, res, next){
	try{
		let { NomFlujo, CodCategoriaFlujo, CodPaso_Inicial, Descripcion, Orden } = req.body
		let getConnection = await connexion.getConnection();
		let result = await getConnection.input('NomFlujo',NomFlujo).query( `SELECT Id_Flujo, NomFlujo, CodCategoriaFlujo, CodPaso_Inicial, Descripcion, Orden, Activo, Fecha, Usuario FROM flujo WHERE NomFlujo = @NomFlujo`);

		if (result.recordset.length > 0) {
			res.status(201).json({'status':201, 'msg' : "El registro ya exite"});
		} else{
			return new Promise(function(resProm, rej){
				getConnection.input('NomFlujo',NomFlujo).
				input('CodCategoriaFlujo',CodCategoriaFlujo).
				input('CodPaso_Inicial',CodPaso_Inicial).
				input('Descripcion',Descripcion).
				input('Orden',Orden).
				input('Activo',1).
				input('Fecha',Fecha).
				input('Usuario',Usuario).query(`INSERT INTO Flujo VALUES (@NomFlujo, @CodCategoriaFlujo, @CodPaso_Inicial, @Descripcion, @Orden, @Activo, @Fecha, @Usuario)`)
				.then(function (data) {
					if(data.rowsAffected.length > 0 ){
						res.status(201).json({'status':200, 'msg':'registro creado exitosamente'})
					}else{
						res.status(201).json({'status':201, 'msg':'error'})
					}
				})
				.catch(function(err) {
				   // plan on handling all errors here
				   // is it better to handle each error individually upstream?  
				   console.log(err);
		   
			   });
			}).catch(function(err) {
			   console.log(err);
		   });
		}
	}catch(error){
		res.status(500).json({'status':500, error : error})
	}
}

module.exports.crearEjemplo = async function(req, res, next){
	try{
		//console.log(req)
		let { nombre, apellido, usuario, password } = req.body
		//let users = "jonat12@hotmail.com"
		let getConnection = await connexion();
		let validateUser = await getConnection.query`SELECT * FROM usuarios WHERE usuario = ${usuario}`
		if(validateUser.recordset.length > 0 ){
			res.status(201).json({'status':201, 'msg' : "el correo ya se encuentra registrado"})
		}else{
			let insertUser = await conection.query`INSERT INTO usuarios (nombre, apellido, usuario, password) VALUES (${nombre}, ${apellido}, ${usuario}, ${password})`
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