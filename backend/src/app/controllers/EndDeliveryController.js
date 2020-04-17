import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class EndDeliveryController {
  async update(request, response) {
    const { id } = request.params;

    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Dados inválidos' });
    }

    const { signature_id } = request.body;

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
      signature_id,
      end_date: new Date(),
    });

    return response.status(200).json(delivery);
  }
}

export default new EndDeliveryController();
