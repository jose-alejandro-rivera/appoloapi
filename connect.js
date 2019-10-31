const mssql = require('mssql');

module.exports.getConnection = async function (data)  {
	try{
		const connectDB = await new mssql.ConnectionPool({
			user: 'sa',
			password: 'admin1234*',
			server: process.env.SERVER,
			database: process.env.DATABASE
		}).connect();

		var pool = await connectDB.request();
		return pool;
		
	}catch(error){
		console.log(error,)
	}
}