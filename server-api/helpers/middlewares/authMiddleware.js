const verifyJWTToken =require('../../libs/auth').verifyJWTToken

exports.verifyJWT_MW=(req, res, next)=>
{
  let token = req.headers.authorization
    
  verifyJWTToken(req,token)
    .then((decodedToken) =>
    {
      // req.user = decodedToken.data
      next()
    })
    .catch((err) =>
    {
      res.status(400)
        .json(
            {
                error: "Invalid auth token provided.",
                message:err
            }
        )
    })
}