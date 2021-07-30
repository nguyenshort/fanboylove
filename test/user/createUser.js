require('dotenv').config({ path: '../../.env' })
const database = require('../../database')
database.connect()
const User = require('../../models/User')

async function f() {
  return User.create({
    name: 'Nguyên Trần',
    email: 'dnstylish@gmail.com',
    role: 'admin',
    createdAt: Date.now(),
    password: 'Khoi@025'
  })
}
f()
