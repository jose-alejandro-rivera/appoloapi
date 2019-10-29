const connexion = require('../connect.js')

module.exports.tableUsers = async function(req, res, next){
	//es.header("Access-Control-Allow-Origin", "*");
	try{
		
		let getConnection = await connexion();
		let sqlHeaders = await getHeaders(getConnection)
		let sqlBody    = await getBody(getConnection)

		res.status(200).json(
			{
				'status':200, 
				'headers':sqlHeaders,
				'body': sqlBody
			}
		)
	}catch(error){
		console.log(error)
		res.status(500).json({'status':500, 'error':'Error en consulta campos o tabla'})
	}
}

module.exports.getPrueba = function(req, res, next){
	res.status(200).json('hello world')
}

async function getHeaders(connection){
	let sql = await connection.query`
		SELECT S.NAME,S.XTYPE, S.LENGTH,S.ISNULLABLE,
		(SELECT COUNT(*) 
			FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ISC 
			WHERE 
				ISC.COLUMN_NAME=S.NAME AND ISC.TABLE_NAME=SO.NAME AND (ISC.CONSTRAINT_NAME LIKE 'PK_%' OR ISC.CONSTRAINT_NAME LIKE '%_PK')
		) ISPRIMARYKEY
		FROM SYSCOLUMNS S 
		JOIN SYSOBJECTS SO ON (SO.ID=S.id) 
		JOIN SYSTYPES T ON  (S.XTYPE=T.XTYPE)
		WHERE SO.XTYPE='U' AND SO.CATEGORY=0 
		AND SO.NAME NOT IN ('sysdiagrams')
		AND T.NAME NOT IN ('sysname') 
		AND UPPER(SO.NAME)= UPPER('usuarios') 
		ORDER BY SO.NAME, COLORDER`
	return sql.recordset
}

async function getBody(connection){
	let sql = await connection.query('SELECT * FROM usuarios')
	return sql.recordset
}