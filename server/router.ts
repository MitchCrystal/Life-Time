import Router from 'koa-router';
import { getImages } from './controller/controller';

const router = new Router();

router.get('/images', getImages);

export = router;
