const {
  ApolloError,
  ForbiddenError,
  AuthenticationError
} = require('apollo-server-express')

const User = require('../models/User')

class UserController {
  constructor(user) {
    if (!user) {
      throw new AuthenticationError('Bạn không có quyền truy cập')
    }
    this.user = user
  }

  async update(feild, value) {
    if (!feild || !value) {
      return this.user
    }
    if (['name', 'avatar'].includes(feild)) {
      return this._updateFeild(feild, value)
    }
    if (feild === 'email') {
      if (this.user.email === value) {
        return this.user
      }
      if (!new RegExp('^[\\w-\\/.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(value)) {
        throw new ApolloError('Email không hợp lệ', 'HAS_MESS')
      }
      const check = await User.find({ email: value }).countDocuments()
      if (check) {
        throw new ApolloError('Email đã được sử dụng', 'HAS_MESS')
      }
      return this._updateFeild('email', value)
    }
    return this.user
  }

  async _updateFeild(feild, value) {
    return User.findByIdAndUpdate(
      this.user._id,
      { [feild]: value },
      { returnOriginal: false }
    )
  }

  static isMod(user) {
    return user ? ['mod', 'admin'].includes(user.role) : false
  }
}

module.exports = UserController
