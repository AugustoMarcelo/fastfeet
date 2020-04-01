import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import Queue from '../../lib/Queue';
import DeliveryReadyMail from '../jobs/DeliveryReadyMail';

class DeliveryController {
  async index(request, response) {
    let where = {};
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;

    if (q) {
      where = {
        product: {
          [Op.like]: `%${q}%`,
        },
      };
    }

    const deliveries = await Delivery.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return response.status(200).json(deliveries);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados Inválidos' });
    }

    const { recipient_id, deliveryman_id } = request.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return response
        .status(401)
        .json({ error: 'Destinatário não encontrado' });
    }

    const deliveryMan = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryMan) {
      return response.status(401).json({ error: 'Entregador não encontrado' });
    }

    const delivery = await Delivery.create(request.body);

    await Queue.add(DeliveryReadyMail.key, {
      deliveryman: deliveryMan,
      delivery,
      recipient,
    });

    return response.status(201).json(delivery);
  }

  async update(request, response) {
    const { id } = request.params;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(404).json({ error: 'Encomenda não encontrada' });
    }

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados Inválidos' });
    }

    delivery = await delivery.update(request.body);

    return response.json(delivery);
  }

  async destroy(request, response) {
    const { id } = request.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(401).json({ error: 'Encomenda não encontrada' });
    }

    delivery.destroy();

    return response.sendStatus(204);
  }
}

export default new DeliveryController();
