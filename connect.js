const mssql = require("mssql/msnodesqlv8")

module.exports = (async () => {
 const connect = await mssql.connect({
		driver: "msnodesqlv8",
	    server: "localhost",
	    database: "APOLO",
	    options: {
	    trustedConnection: true,
	    useUTC: true
	  }
	})

  return connect ;
})();