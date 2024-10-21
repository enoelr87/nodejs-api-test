import z from 'zod'

const userSchema = z.object({
  first_name: z.string({
    invalid_type_error: 'User name must be a string',
    required_error: 'User name is required.'
  }),
  last_name: z.string({
    invalid_type_error: 'User last name must be a string',
    required_error: 'User last name is required.'
  }),
  username: z.string({
    invalid_type_error: 'User email must be a string',
    required_error: 'User email is required.'
  }).email(),
  password: z.string(),
  active: z.boolean(),
  role: z.string(),
  courses: z.array(
    z.enum(['1', '2', '3', '4', '5']),
    {
      required_error: 'User course is required.',
      invalid_type_error: 'User course must be an array of enum Courses'
    }
  ),
  sessionToken: z.string()
})

const userLoginSchema = z.object({
  username: z.string({
    invalid_type_error: 'User email must be a emil',
    required_error: 'User email is required.'
  }).email(),
  password: z.string({
    invalid_type_error: 'User password must be a string',
    required_error: 'User password is required.'
  })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}

export function validateUserLogin (input) {
  return userLoginSchema.safeParse(input)
}
