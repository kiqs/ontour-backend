'use strict';

import superagent from 'superagent';
import Event from '../../models/Event';
import router from '../router';
import * as constants from '../../constants/api';
import { authLocal } from '../../auth';

router.post('/upcoming-events', async(ctx, next) => {
  try {
    const res = await superagent.get(ctx.request.body.link)
      .query({ min_date: ctx.request.body.min_date })
      .query({ max_date: ctx.request.body.max_date })
      .query({ apikey: constants.SK_KEY })
      .query({ page: ctx.request.body.page })
      .query({ per_page: ctx.request.body.per_page })
      .withCredentials();

    let results = JSON.parse(res.text);

    const resLikes = await Event.find({user_id: ctx.request.body.user_id, like: true});

    results.resultsPage.results.event.forEach(event => {
      resLikes.forEach(like => {
        if (like.event_id == event.id) {
          event.like = true;
        }
      });
    });

    ctx.body = results.resultsPage;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.get('/events', async(ctx, next) => {
  try {
    ctx.body = await Event.find();
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/events', async(ctx, next) => {
  try {
    if (!ctx.request.body.like) {
      ctx.body = await Event.remove({event_id: ctx.request.body.event_id});
      return;
    }

    ctx.body = await Event.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
