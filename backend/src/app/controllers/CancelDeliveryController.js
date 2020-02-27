import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class CancelDeliveryController {
  async update(request, response) {
    const { id } = request.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      return response.status(400).json({ error: 'Problema não encontrado' });
    }

    let delivery = await Delivery.findByPk(deliveryProblem.delivery_id);

    if (!delivery) {
      return response.status(400).json({ error: 'Encomenda não encontrada' });
    }

    if (delivery.canceled_at) {
      return response
        .status(401)
        .json({ error: 'A encomenda já está cancelada' });
    }

    delivery = await delivery.update({
      canceled_at: new Date(),
    });

    return response.status(200).json(delivery);
  }
}

export default new CancelDeliveryController();
