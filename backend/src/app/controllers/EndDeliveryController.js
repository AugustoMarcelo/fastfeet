import Delivery from '../models/Delivery';

class EndDeliveryController {
  async update(request, response) {
    const { id } = request.params;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(400).json({ error: 'Encomenda não encontrada' });
    }

    if (!delivery.start_date) {
      return response
        .status(401)
        .json({ error: 'A encomenda não possui data de retirada' });
    }

    delivery = await delivery.update({
      end_date: new Date(),
    });

    return response.json(delivery);
  }
}

export default new EndDeliveryController();
