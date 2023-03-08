import Router from "koa-router";
import { getImages, /*getWiki*/ } from "./controller/controller";

const router = new Router

router.get('/images',getImages)

// router.get('/wiki/article/:id', getWiki)

// router.get('/wiki/article', getWiki)

export = router