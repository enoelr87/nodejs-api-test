import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'revalida_sucesso'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel {
  static async getAll ({ role }) {
    if (role) {
      const lowerCaseRole = role.toLowerCase()

      const [roles] = await connection.query(
        'SELECT id, name FROM roles WHERE LOWER(name) = ?;',
        [lowerCaseRole]
      )

      if (roles.length === 0) return []

      const [{ id }] = roles

      const [users] = await connection.query(
        'select name, email, birthdate, phone, address, isActive, BIN_TO_UUID(id) id from users inner join users_roles on users_roles.role_id = ?;',
        [id]
      )
      return users
    }

    const [users] = await connection.query(
      'select name, email, birthdate, phone, address, isActive, BIN_TO_UUID(id) id from users;'
    )
    return users
  }

  static async getById ({ id }) {
    const [users] = await connection.query(
      `select name, email, birthdate, phone, address, isActive, BIN_TO_UUID(id) id
        FROM users WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (users.length === 0) return null
    return users[0]
  }

  static async create ({ input }) {
    const {
      name,
      email,
      birthdate,
      phone,
      address,
      isActive,
      roles
    } = input

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO users (id, name, email, birthdate, phone, address, isActive)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [name, email, birthdate, phone, address, isActive]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating user')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [users] = await connection.query(
      `SELECT name, email, birthdate, phone, address, isActive, BIN_TO_UUID(id) id
        FROM users WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return users[0]
  }

  static async delete ({ id }) {
    const [users] = await connection.query(
      'delete FROM users WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    return users.length > 0
  }

  static async update ({ id, input }) {
    // ejercicio fácil: crear el update
  }
}
