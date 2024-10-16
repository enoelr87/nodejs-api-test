import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const users = readJSON('./data/json/users.json')

export class UserModel {
  static async getAll ({ role }) {
    if (role) {
      return users.filter(
        user => user.roles.some(r => r.toLowerCase() === role.toLowerCase())
      )
    }

    return users
  }

  static async getById ({ id }) {
    const user = users.find(user => user.id === id)
    return user
  }

  static async create ({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input
    }

    users.push(newUser)

    return newUser
  }

  static async delete ({ id }) {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const userIndex = users.findIndex(movie => movie.id === id)
    if (userIndex === -1) return false

    users[userIndex] = {
      ...users[userIndex],
      ...input
    }

    return users[userIndex]
  }
}
