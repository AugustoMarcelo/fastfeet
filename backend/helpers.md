# Comandos de desenvolvimento
Arquivo com lista de comandos utilizados no desenvolvimento

- Criação de Migration
> yarn sequelize migration:create --name=migration-name

- Execução de Migration
> yarn sequelize db:migrate migration-name

- Revertendo a última Migration executada
> yarn sequelize db:migrate:undo

- Criação de Seed
> yarn sequelize seed:generate --name seed-name

- Execução de Seed
> yarn sequelize db:seed:all

- Listando os containers no docker
> docker ps -a
