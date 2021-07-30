class UserController {
  static isMod(user) {
    return user ? ['mod', 'admin'].includes(user.role) : false
  }
}

module.exports = UserController
