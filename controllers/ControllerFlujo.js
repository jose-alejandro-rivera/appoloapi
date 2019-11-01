const connexion = require('../connect.js')
var Fecha = new Date();
var Usuario = 'soporte';

module.exports.initFlujo = async function(req, res, next){
	try{
		let getConnection = await connexion.getConnection();
		let sql = await getConnection.query`SELECT Id_CategoriaFlujo ,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo`
		let sql2 = await getConnection.query`SELECT Id_Paso,NomPaso,Descripcion,Activo,CodCuestionario,CodProceso,Fecha,Usuario FROM paso`
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
						res.status(200).json({'status':200, 'msg':'registro creado exitosamente'})
					}else{
						res.status(201).json({'status':201, 'msg':'error'})
					}
				})
				.catch(function(err) {
				   console.log(err);
				   res.status(201).json({'status':201, 'msg':'Error al realizar la consulta'})
			   });
			}).catch(function(err) {
			   console.log(err);
		   });
		}
	}catch(error){
		res.status(500).json({'status':500, error : error})
	}
}


module.exports.listarFlujo = async function(req, res, next){
	try{
		let getConnection = await connexion.getConnection();
		let sql = await getConnection.query`SELECT Id_Flujo
		,NomFlujo
		,(select c.* from CategoriaFlujo as c where Id_CategoriaFlujo=CodCategoriaFlujo FOR JSON PATH) as CategoriaFlujo
		,(select p.* from Paso as p where Id_Paso=CodPaso_Inicial FOR JSON PATH) as PasoInicial
		,CodPaso_Inicial
		,Descripcion
		,Orden
		,Activo
		,Fecha
		,Usuario
	    FROM Flujo`
		console.log(sql);
		res.status(200).json({'status':200, 'data': sql}
		)
	}catch(error){
		res.status(500).json({'status':500,'error' : error.originalError}
		)
	}
}
