import { validateUserLogin } from '../shemas/users.js'
import jwt from 'jsonwebtoken'

export class AuthController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    const result = validateUserLogin(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const userData = await this.userModel.getByUsernameAndPassword(result.data)
    if (userData) {
      const accessToken = jwt.sign({ id: userData._id, username: userData.username }, process.env.SECRET_JWT_KEY, {
        expiresIn: '1h'
      })
      const { password, ...user } = userData
      if (user) return res.send({ auth: true, user, accessToken })
    }

    res.status(401).json({ message: 'Credenciais inválidas' })
  }

  logout = async (req, res) => {
    res.json({ auth: false, user: null, token: null })
  }
}
