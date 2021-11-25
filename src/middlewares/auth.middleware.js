const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
    authenticateToken
}

//  authentication middleware
function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	// Error 401 - Unauthorized
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, config.SECRET_KEY, (err, dataStored) => {
		console.log(err);
        
		// Error 403 – Forbidden
		if (err) return res.sendStatus(403);
		req.user = dataStored;
		next();
	});
}

