import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class PendingDeliveryController {
  async index(request, response) {
    const { id } = request.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return response.status(401).json({ error: 'Entregador não encontrado' });
    }

    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
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

export default new PendingDeliveryController();
