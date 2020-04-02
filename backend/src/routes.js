import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import PendingDeliveryController from './app/controllers/PendingDeliveryController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Rotas para os entregadores: acesso via ID
/** Visualização de entregas pendentes e não canceladas */
routes.get('/deliveryman/:id/pending', PendingDeliveryController.index);
/** Visualiza de entregas já realizadas */
routes.get('/deliveryman/:id/deliveries', CompletedDeliveryController.index);
/** Rota para indicar a retirada do produto */
routes.put('/deliveries/:id/start', StartDeliveryController.update);
/** Rota para finalizar a entrega do produto */
routes.put('/deliveries/:id/end', EndDeliveryController.update);
/** Rota para o entregador cadastrar problemas */
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
/** Rota para listar todos os problemas de uma entrega */
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

routes.use(authMiddleware);
/** Rota que lista todas as encomendas com problemas */
routes.get('/deliveries/problems', DeliveryProblemController.index);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliveryManController.index);
routes.get('/deliverymen/:id', DeliveryManController.show);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.destroy);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

/** Rota para a distribuidora cancelar uma entrega */
routes.put('/problem/:id/cancel-delivery', CancelDeliveryController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.show);

export default routes;
