import Router from "koa-router";
import { getImages, getMov } from "./controller/controller";

const router = new Router

router.get('/images',getImages)

router.get('/weirdmovs', getMov)


export = router