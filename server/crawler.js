const axios = require('axios')
const rethinkdbdash = require('rethinkdbdash')

const r = rethinkdbdash();

async function crawel(){
  const res = await axios('')
  console.info('request complete')

  const dbRes = await r.table('articles').insert(res.data.response.documents.doc.map(doc => ({
    created: r.now(),
    image: doc.thumbnail.url,
    title: doc.content
  })))

  console.table(dbRes)
}

crawel()
setInterval(crawel, 1000 * 5)

