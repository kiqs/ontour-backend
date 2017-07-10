'use strict';

import superagent from 'superagent';
import Event from '../../models/Event';
import router from '../router';
import * as constants from '../../constants/api';

router.get('/events', async(ctx, next) => {
  try {
    ctx.body = await Event.find();
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/upcoming-events', async(ctx, next) => {
  try {
    let url = `${ctx.request.body.link}?apikey=${constants.SK_KEY}&page=${ctx.request.body.page}&per_page=${ctx.request.body.per_page}`;
    let res = await superagent.get(`${url}`).withCredentials();
    let results = JSON.parse(res.text);
    ctx.body = results.resultsPage;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/events', async(ctx, next) => {
  try {
    ctx.body = await Event.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
