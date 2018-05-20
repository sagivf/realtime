const rethinkdbdash = require('rethinkdbdash')
const io = require('socket.io')();

const r = rethinkdbdash();

(async function() {

  io.on('connection', async client => {
    const articles = await r.table('articles')
                            .filter({ source: 'cnn'})
                            .orderBy(r.desc('created'))
                            .limit(5);

    client.emit('init-articles', articles);
  });

  const cursor = await r.table('articles')
                        .filter({ source: 'cnn'})
                        .changes();

  cursor.each((err, { old_val, new_val }) => {
    if (new_val && !old_val) {
      io.emit('add-article', new_val);
    }
  });
})();

io.listen(3000);
