import {
  format,
  setSeconds,
  setMinutes,
  setHours,
  isBefore,
  isAfter,
} from 'date-fns';

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

class StatusDeliveryController {
  async update(request, response) {
    const { id } = request.params;
    const { deliveryman_id } = request.body;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(400).json({ error: 'Encomenda não encontrada' });
    }

    const deliveryMan = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryMan) {
      return response.status(400).json({ error: 'Entregador não encontrado' });
    }

    const date = new Date();

    /* Horários de retirada permitidos: 8h às 18h */
    const initalTime = setSeconds(setMinutes(setHours(date, 7), 59), 59);
    const finalTime = setSeconds(setMinutes(setHours(date, 18), 0), 0);

    if (isBefore(date, initalTime) || isAfter(date, finalTime)) {
      return response.status(401).json({
        error: 'Retirada não permitida antes das 08:00 ou após às 18:00',
      });
    }

    const dateFormatted = format(new Date(), 'yyyy-MM-dd');

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        start_date: dateFormatted,
      },
    });

    if (count >= 5) {
      return response
        .status(401)
        .json({ error: 'Limite de retiradas (5) excedido' });
    }

    delivery = await delivery.update({
      start_date: new Date(),
    });

    return response.status(200).json(delivery);
  }
}

export default new StatusDeliveryController();
