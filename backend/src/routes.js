import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import PendingDeliveryController from './app/controllers/PendingDeliveryController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Rotas para os entregadores: acesso via ID
routes.get('/deliveryman/:id/pending', PendingDeliveryController.index);
routes.get('/deliveryman/:id/deliveries', CompletedDeliveryController.index);

routes.use(authMiddleware);
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliveryManController.index);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.destroy);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
