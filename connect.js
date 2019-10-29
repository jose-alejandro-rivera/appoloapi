
const mssql = require('mssql/msnodesqlv8');

module.exports = function getConnection(data)  {
	try{
		const connectDB = new mssql.ConnectionPool({
			driver: 'msnodesqlv8',
			server: process.env.SERVER,
			database: process.env.DATABASE,
		  options: {
		  	trustedConnection: true,
		  	useUTC: true
	  	}
		}).connect()
    return connectDB.then(pool => {
   	 	//console.log('Connected to MSSQL', pool)
    	return pool
  	})
		
	}catch(error){
		console.log(error,)
	}
}