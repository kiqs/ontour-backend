'use strict';

import router from './router';
import disconnect from 'disconnect';

const Discogs = disconnect.Client;
const DISCOGS_TOKEN = 'zVJtjArUWSqaiupSkWTpXZoqcKbUyItkoUgutimC';
const db = new Discogs({userToken: DISCOGS_TOKEN}).database();

router.get('/releases/:artist', async(ctx, next) => {
  try {
    let releases = await db.search(ctx.params.artist, {artist: ctx.params.artist});
    ctx.body = releases;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
