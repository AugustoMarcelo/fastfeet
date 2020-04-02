import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(request, response) {
    let where = {};
    const { page = 1, limit = 10, q } = request.query;
    const offset = (page - 1) * limit;

    if (q) {
      where = {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }

    const recipients = await Recipient.findAndCountAll({
      where,
      limit,
      offset,
    });

    return response.status(200).json(recipients);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados inválidos' });
    }

    const recipient = await Recipient.create(request.body);

    return response.status(201).json(recipient);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      state: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Dados inválidos' });
    }

    const { id } = request.params;

    let recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return response
        .status(401)
        .json({ error: 'Destinatário não encontrado' });
    }

    recipient = await recipient.update(request.body);

    return response.status(200).json(recipient);
  }

  async show(request, response) {
    const { id } = request.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return response
        .status(401)
        .json({ error: 'Destinatário não encontrado' });
    }

    return response.status(200).json(recipient);
  }
}

export default new RecipientController();
