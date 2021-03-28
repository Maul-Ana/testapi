const axios = require('axios')
const cheerio = require('cheerio')

async function Comedy() {
  return new Promise((resolve, reject) => {
    axios.get(`https://movieofotaku.blogspot.com/search/label/Comedy`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        let synopsis = []
     let url = []
     let img = []
 	$('div.thumbnail > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.snippet-ongoing').get().map((rest) => {
        	synopsis.push($(rest).text())
         })
         $('div.thumbnail > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	sinopsis: synopsis[i],
               	img: img[i]
          })
     }
            
        const res = {
            status: 200,
            hasil: result
          }
          resolve(res)
      })
      .catch(reject)
  })
}

module.exports = Comedy