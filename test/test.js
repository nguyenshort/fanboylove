const axios = require('axios')

;(async () => {
  try {
    const response = await axios.get(
      'https://saytruyen.net/app/manga/uploads/SAYTRUYEN.jpg'
    )
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})()
