import z from 'zod'

const userSchema = z.object({
  name: z.string({
    invalid_type_error: 'User name must be a string',
    required_error: 'User name is required.'
  }),
  email: z.string().email(),
  birthdate: z.string().date(),
  phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
  }),
  isActive: z.boolean(),
  roles: z.array(
    z.enum(['admin', 'user']),
    {
      required_error: 'User role is required.',
      invalid_type_error: 'User role must be an array of enum Roles'
    }
  )
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}
