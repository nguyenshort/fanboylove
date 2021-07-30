require('dotenv').config({ path: '../../.env' })
const axios = require('axios')
const cheerio = require('cheerio')

const database = require('../../database')
database.connect()
const Category = require('../../models/Category')

async function f() {
  try {
    const categories = [
      'Action',
      'Adult',
      'Chuyển Sinh',
      'Comedy',
      'Comic',
      'Cooking',
      'Cổ Đại',
      'Đam Mỹ',
      'Fantasy',
      'Harem',
      'Horror',
      'Live action',
      'Manhua',
      'One shot',
      'Romance',
      'School Life',
      'Shounen',
      'Shounen Ai',
      'Slice of Life',
      'Sports',
      'Supernatural',
      'Trinh Thám',
      'Webtoon',
      'Xuyên Không'
    ].map(async (value) => {
      await Category.create({ name: value })
    })
  } catch (error) {
    console.error(error)
  }
}
f()
