exports.notFoundError = function (res) {
	res.writeHead(404, {"Content-Type": "text/plain"});
	res.write("404 Not Found\n");
	return res;
}

exports.mysqlError = function (error,res) {
	res.writeHead(404, {"Content-Type": "text/plain"});
	res.write(error);
	return res;
}

exports.json = function (res, json) {
	res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(json));
    return res;
}
	
