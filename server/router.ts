import Router from "koa-router";
import { getImages, /*getWiki, getSections*/ } from "./controller/controller";

const router = new Router

router.get('/images',getImages)

// router.get('/sections', getSections)

// router.get('/wiki/article/:id', getWiki)

// router.get('/wiki/article', getWiki)

export = router