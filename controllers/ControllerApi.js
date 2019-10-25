const axios = require('axios');

module.exports.getAlluser = function(req, res, next){
	//res.header("Access-Control-Allow-Origin", "*");
	try{
		axios('https://jsonplaceholder.typicode.com/users')
	  .then(function (response) {
    	console.log(response.data,'data bien')
    	let jsonDecode = response.data 
    	res.status(200).json(jsonDecode)
  	})
  	.catch(function (error) {
    	res.status(201).json(error)
  	})
	}catch(error){
		res.status(500).json(error.response.statusText)
	}
}

module.exports.getIdUsers = function(req, res, next){
	//res.header("Access-Control-Allow-Origin", "*");
	try{
		let { id } = req.params
		axios(`https://jsonplaceholder.typicode.com/users?id=${id}`)
		.then((response) => {
			console.log(response.data,'data bien')
			let jsonDecode = response.data 
    	res.status(200).json(jsonDecode)
		})
		.catch((error) => {
			res.status(201).json(error)
		})
	}catch(error){
		res.status(500).json(error.response.statusText)
	}
}