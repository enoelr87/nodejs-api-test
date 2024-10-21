import jwt from 'jsonwebtoken'

export const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ auth: false, message: 'Access denied. No token provided.' })

  jwt.verify(token, process.env.SECRET_JWT_KEY, function (err, decoded) {
    if (err) return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' })

    req.userId = decoded.id
    next()
  })
}
