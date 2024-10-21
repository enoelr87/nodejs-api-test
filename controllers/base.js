export class BaseController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  verifySession = async (req, res, next) => {
    if (req.path === '/auth/login') {
      return next()
    }
    const sessionToken = req.headers.authorization
    const user = await this.userModel.getBySessionToken({ sessionToken })

    if (!user) {
      return res.status(403).json({ message: 'Sesión no válida o expirada' })
    }

    next()
  }
}
