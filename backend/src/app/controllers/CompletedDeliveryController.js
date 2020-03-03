import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class CompletedDeliveryController {
  async index(request, response) {
    const { id } = request.params;
    const { page = 1, limit = 10 } = request.query;
    const offset = (page - 1) * limit;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return response.status(401).json({ error: 'Entregador não encontrado' });
    }

    const deliveries = await Delivery.findAndCountAll({
      limit,
      offset,
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: {
        exclude: ['deliveryman_id'],
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    return response.json(deliveries);
  }
}

export default new CompletedDeliveryController();
