import Router from "koa-router";
import { getImages, getMov, getWiki } from "./controller/controller";

const router = new Router

router.get('/images',getImages)

router.get('/weirdmovs', getMov)

router.get('/wikitest',getWiki)

export = router