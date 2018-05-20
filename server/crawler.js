const axios = require('axios')
const rethinkdbdash = require('rethinkdbdash')

const r = rethinkdbdash();

async function crawel(){
  const res = await axios('')

  const dbRes = await r.table('articles').insert(res.data.response.documents.doc.map(doc => ({
    id: doc.rec_en_did,
    image: doc.thumbnail.url,
    title: doc.content
  })))

  console.log(dbRes)
}

crawel()
setInterval(crawel, 1000 * 60)

