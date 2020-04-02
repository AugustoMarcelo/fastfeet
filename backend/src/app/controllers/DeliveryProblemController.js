import { Op } from 'sequelize';
import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(request, response) {
    let where = {
      canceled_at: null,
    };
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;

    if (q) {
      where = {
        product: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }

    const deliveriesWithProblem = await DeliveryProblem.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          where,
        },
      ],
    });

    return response.status(200).json(deliveriesWithProblem);
  }

  async store(request, response) {
    const { id } = request.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(400).json({ error: 'Entrega não encontrada' });
    }

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados inválidos' });
    }

    const { description } = request.body;

    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return response.status(201).json(problem);
  }

  async show(request, response) {
    const { id } = request.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return response.status(400).json({ error: 'Encomenda não encontrada' });
    }

    const problems = await DeliveryProblem.findAndCountAll({
      where: {
        delivery_id: id,
      },
    });

    return response.status(200).json(problems);
  }
}

export default new DeliveryProblemController();
