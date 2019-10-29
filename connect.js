const mssql = require("mssql/msnodesqlv8")

module.exports = ( () => {
 const connect = null
 /*await mssql.connect({
		driver: 'msnodesqlv8',
	    server: 'localhost',
	    database: 'productos',
	    options: {
	    trustedConnection: true,
	    useUTC: true
	  }
	})*/

  return connect ;
})();

module.exports = function getConnection(data)  {
	const connectDB = mssql.connect({
		driver: process.env.DRIVER,
	  server: process.env.SERVER,
	  database: process.env.DATABASE,
	  options: {
	    trustedConnection: true,
	    useUTC: true
	  }
	})
	return connectDB.then((res) => {
		return res;
	});
	
}