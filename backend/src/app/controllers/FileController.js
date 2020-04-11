import File from '../models/File';

class FileController {
  async store(request, response) {
    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path,
    });

    return response.status(201).json(file);
  }

  async show(request, response) {
    const { id } = request.params;

    const file = await File.findByPk(id);

    if (!file) {
      return response.status(400).json({ error: 'Arquivo não encontrado' });
    }

    return response.status(200).json(file);
  }
}

export default new FileController();
