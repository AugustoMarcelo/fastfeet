import * as Yup from 'yup';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(request, response) {
    const deliverymen = await DeliveryMan.findAndCountAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return response.json(deliverymen);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados inválidos' });
    }

    const deliveryman = await DeliveryMan.create(request.body);

    return response.status(201).json(deliveryman);
  }

  async update(request, response) {
    const { id } = request.params;

    let deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return response.status(400).json({ error: 'Entregador não encontrado' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Dados inválidos' });
    }

    deliveryMan = await deliveryMan.update(request.body);

    return response.json(deliveryMan);
  }

  async destroy(request, response) {
    const { id } = request.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return response.status(404).json({ error: 'Entregador não encontrado' });
    }

    if (deliveryMan.avatar_id) {
      const avatar = await File.findByPk(deliveryMan.avatar_id);

      avatar.destroy();

      promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', avatar.path)
      );
    }

    deliveryMan.destroy();

    return response.sendStatus(204);
  }
}

export default new DeliveryManController();
