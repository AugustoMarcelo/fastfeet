import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => response.json({ hello: 'world' }));

export default routes;
