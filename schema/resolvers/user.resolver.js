const AuthController = require('../../controller/auth.controller')

module.exports = {
  Query: {
    me: (_, {}, { user }) => {
      console.log(user)
      return user
    }
  },

  Mutation: {
    signinUser: async (_, { email, password }) => {
      const authController = new AuthController()
      return authController.login(email, password)
    },

    signupUser: async (_, { name, email, password }) => {
      const authController = new AuthController()
      return authController.signup(name, email, password)
    }
  }
}
