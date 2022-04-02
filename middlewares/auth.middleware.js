const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
    try {
        const token = req.get('Authorization')
        if(!token){
            return res. status(401).json({msg: 'Request without token'})
        } 
        const tokenWithoutBearer = token.split(' ')[1]    //ver no exemplo do imsonia   Authentication   Bearer Token
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)
        req.user = {...decodedToken}
        next()

    } catch (error) {
        res.status(401).json({msg: 'Unauthorized', error: error.message})
    }
  
}

module.exports = authorization;