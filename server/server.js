const rethinkdbdash = require('rethinkdbdash')
const io = require('socket.io')();

const r = rethinkdbdash();

io.on('connection', async client => {
  const cursor = await r.table('articles').changes({
    includeTypes: true,
    includeStates: true,
    includeInitial: true
  })

  let components = [];
  cursor.each((err, { type, state, new_val }) => {
    if (type === 'state' && state === 'initializing') {
      components = [];
    }

    if (type === 'initial') {
      components.push(new_val)
    }

    if (type === 'state' && state === 'ready') {
      client.emit('init-articles', components);
    }

    if (type === 'add') {
      client.emit('add-article', new_val);
    }

    if (type === 'change') {

    }

    if (type === 'remove') {

    }
  });
});

io.listen(3000);
