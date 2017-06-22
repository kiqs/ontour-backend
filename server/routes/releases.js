'use strict';

import router from './router';
import disconnect from 'disconnect';

const Discogs = disconnect.Client;
const DISCOGS_TOKEN = 'zVJtjArUWSqaiupSkWTpXZoqcKbUyItkoUgutimC';
const db = new Discogs({userToken: DISCOGS_TOKEN}).database();

router.post('/releases', async(ctx, next) => {
  try {
    let releases = await db.search(ctx.params.artist, {
      type: 'release',
      artist: ctx.request.body.artist,
      format: 'album',
      page: ctx.request.body.page
    });
    ctx.body = releases;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
