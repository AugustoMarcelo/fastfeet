import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class MobileSessionController {
  async show(request, response) {
    const { id } = request.params;

    const deliveryMan = await DeliveryMan.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });

    if (!deliveryMan) {
      return response.status(400).json({ error: 'Entregador não encontrado' });
    }

    return response.status(200).json(deliveryMan);
  }
}

export default new MobileSessionController();
