# Documentação da API

## Rotas para entregadores (acesso via ID)

# [`GET` /deliveryman/{id}/pending{?page?limit}]
> Retorna todas as entregas que estão pendentes e que não foram canceladas
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |
  | id        | ID do entregador | Path | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,
      "rows": [
        {

        },
      ]
    }
    ```

# [`GET` /deliveryman/{id}/deliveries{?page?limit}]
> Retorna todas as entregas realizadas
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |
  | id        | ID do entregador | Path | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,
      "rows": [
        {

        },
      ]
    }
    ```

# [`PUT` /deliveries/{id}/start]
> Atualiza a data de retirada de uma encomenda
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da encomenda | Path | - |

+ Request (application/json)
  ```json
  {
    "deliveryman_id": 1 // ID do entregador
  }
  ```

+ Response `200` (application/json)
  ```json
  {

  }
  ```


# [`PUT` /deliveries/{id}/end]
> Atualiza a data de entrega de uma encomenda
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da encomenda | Path | - |

+ Request (application/json)
  `none`

+ Response `200` (application/json)
  ```json
  {

  }
  ```

# [`POST` /delivery/{id}/problems]
> Cadastra problemas de uma entrega
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da encomenda | Path | - |

+ Request (application/json)
  ```json
  {
    "description": "Destinatário não atendeu"   // Descrição do problema
  }
  ```

+ Response `201` (application/json)
  ```json
  {
    "id": 1,                                    // ID do problema criado
    "delivery_id": 1,                           // ID da entrega associada
    "description": "Destinatário não atendeu",  // Descrição do problema
    "created_at": "2020-02-27T13:59:40.180Z",   // Data de cadastro do problema
    "updated_at": "2020-02-27T13:59:40.180Z"    // Data da atualização do problema
  }
  ```

# [`GET` /delivery/{id}/problems]
> Retorna os problemas de uma entrega
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da emcomenda | Path | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,
      "rows": [
        {
          "id": 1,
          "description": "Destinatário não atendeu",
          "createdAt": "2020-02-27T13:58:27.030Z",
          "updatedAt": "2020-02-27T13:58:27.030Z",
          "delivery_id": 2
        }
      ]
    }
    ```

## Rotas para os administradores

# [`GET` /recipients{?page?limit?q}]
> Retorna todos os destinatários
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |
  | q         | Nome do destinatário a ser buscado | Query (*optional*) | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,                                       // Quantidade de destinatários retornados
      "rows": [                                         // Array de destinatários
        {
          "id": 1,                                      // ID
          "name": "Marcelo Augusto",                    // Nome
          "street": "Av Camilo Calazans",               // Rua
          "number": 64,                                 // Número da cara
          "complement": "Condomínio Rouxinol, casa 04", // Complemento
          "state": "RN",                                // Estado
          "city": "Caicó",                              // Cidade
          "zipcode": "59300000",                        // CEP
          "createdAt": "2020-02-20T18:51:58.872Z",      // Data de criação
          "updatedAt": "2020-02-20T18:51:58.872Z"       // Data de atualização
        }
      ]
    }
    ```

# [`GET` /deliverymen{?page?limit?q}]
> Retorna todos os entregadores
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |
  | q         | Nome do entregador a ser buscado | Query (*optional*) | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,                                                               // Quantidade de entregadores retornados
      "rows": [                                                                 // Array de entregadores
        {
          "id": 2,                                                              // ID
          "name": "Entregador 01",                                              // Nome
          "email": "entregador@fastfeet.com",                                   // E-mail
          "avatar_id": 3,                                                       // ID do avatar
          "avatar": {                                                           // Avatar do entregador
            "url": "localhost:3333/files/2ecabd84f8b3de8bd951eccd87a331ab.png", // URL da imagem
            "name": "Wallpaper Bootcamp 10.0 - Mobile.png",                     // Nome do arquivo
            "path": "2ecabd84f8b3de8bd951eccd87a331ab.png"                      // Nome gerado pelo sistema
          }
        }
      ]
    }
    ```

# [`GET` /deliveries{?page?limit?q}]
> Retorna todas as entregas
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |
  | q         | Nome da encomenda a ser buscada | Query (*optional*) | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,
      "rows": [
        {
          "id": 5,
          "product": "Pilha recarregável 4 UND",          // Nome do produto
          "canceled_at": null,                            // Data de cancelamento
          "start_date": null,                             // Data de retirada
          "end_date": null,                               // Data de confirmação de entrega
          "createdAt": "2020-02-26T14:42:09.977Z",
          "updatedAt": "2020-02-26T14:42:09.977Z",
          "recipient_id": 1,
          "deliveryman_id": 2,
          "signature_id": null,
          "recipient": {                                  // Destinatário
            "id": 1,
            "name": "Marcelo Augusto",
            "street": "Av Camilo Calazans",
            "number": 64,
            "complement": "Condomínio Rouxinol, casa 04",
            "state": "RN",
            "city": "Caicó",
            "zipcode": "59300-000",
            "createdAt": "2020-02-20T18:51:58.872Z",
            "updatedAt": "2020-02-20T18:53:17.288Z"
          },
          "deliveryman": {                                // Entregador
            "id": 2,
            "name": "Entregador 01",
            "avatar_id": 3,
            "email": "entregador@fastfeet.com",
            "createdAt": "2020-02-21T16:36:40.940Z",
            "updatedAt": "2020-02-21T16:36:40.940Z"
          }
        }
      ]
    }
    ```

# [`GET` /deliveries/problems{?page?limit}]
> Retorna todas as entregas com problemas
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | page      | Número da página a ser retornada | Query (*optional*) | 1 |
  | limit     | Quantidade de itens por requisição | Query (*optional*) | 10 |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 1,
      "rows": [
        {
          "id": 3,
          "description": "Destinatário não atendeu",  // Descrição do problema
          "createdAt": "2020-02-27T13:59:40.180Z",
          "updatedAt": "2020-02-27T13:59:40.180Z",
          "delivery_id": 3,
          "delivery": {                               // Encomenda
            "id": 3,
            "product": "X-BOX S",
            "canceled_at": null,
            "start_date": "2020-02-26",
            "end_date": null,
            "createdAt": "2020-02-26T14:41:29.528Z",
            "updatedAt": "2020-02-26T14:43:06.998Z",
            "recipient_id": 1,
            "deliveryman_id": 2,
            "signature_id": null
          }
        }
      ]
    }
    ```

# [`GET` /delivery/{id}/problems]
> Retorna todos os problemas de uma entrega
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da emcomenda | Path | - |

+ Response `200` (application/json)
  + Body
    ```json
    {
      "count": 2,
      "rows": [                                       // Array de problemas
        {
          "id": 1,
          "description": "Destinatário não atendeu",
          "createdAt": "2020-02-27T13:58:27.030Z",
          "updatedAt": "2020-02-27T13:58:27.030Z",
          "delivery_id": 2
        },
        {
          "id": 2,
          "description": "Destinatário não atendeu",
          "createdAt": "2020-02-27T13:58:46.017Z",
          "updatedAt": "2020-02-27T13:58:46.017Z",
          "delivery_id": 2
        }
      ]
    }
    ```

# [`POST` /recipients]
> Cadastra um destinatário
+ Request (application/json)
  ```json
  {
    "name": "Marcelo Augusto",                    // Nome
    "street": "Av Camilo Calazans",               // Rua
    "number": 64,                                 // Número
    "complement": "Condomínio Rouxinol, casa 04", // Complemento
    "state": "RN",                                // Estado
    "city": "Caicó",                              // Cidade
    "zipcode": "59300000"                         // CEP
  }
  ```

+ Response `201` (application/json)
  ```json
  {
    "id": 1,                                      // ID
    "name": "Marcelo Augusto",                    // Nome
    "street": "Av Camilo Calazans",               // Rua
    "number": 64,                                 // Número
    "complement": "Condomínio Rouxinol, casa 04", // Complemento
    "state": "RN",                                // Estado
    "city": "Caicó",                              // Cidade
    "zipcode": "59300000",                        // CEP
    "updatedAt": "2020-02-20T18:51:58.872Z",      // Data de criação
    "createdAt": "2020-02-20T18:51:58.872Z"       // Data de atualização
  }
  ```

# [`POST` /deliverymen]
> Cadastra um entregador
+ Request (application/json)
  ```json
  {
    "name": "Entregador 01",            // Nome
    "email": "entregador@fastfeet.com", // Email
    "avatar_id": 3                      // ID da imagem cadastrada no banco
  }
  ```

+ Response `201` (application/json)
  ```json
  {
    "id": 2,
    "name": "Entregador 01",
    "email": "entregador@fastfeet.com",
    "avatar_id": 3,
    "updatedAt": "2020-02-21T16:36:40.940Z",
    "createdAt": "2020-02-21T16:36:40.940Z"
  }
  ```

# [`POST` /deliveries]
> Cadastra uma encomenda
+ Request (application/json)
  ```json
  {
    "recipient_id": 1,              // ID do destinatário
    "deliveryman_id": 2,            // ID do entregador
    "product": "Aparador de pelos"  // Descrição do produto
  }
  ```

+ Response `201` (application/json)
  ```json
  {
    "id": 9,
    "recipient_id": 1,
    "deliveryman_id": 2,
    "product": "Aparador de pelos",
    "updatedAt": "2020-02-29T14:03:06.694Z",
    "createdAt": "2020-02-29T14:03:06.694Z",
    "signature_id": null,
    "canceled_at": null,
    "start_date": null,
    "end_date": null
  }
  ```

# [`POST` /files]
> Cadastra um arquivo de imagem (avatar do entregador ou assinatura de entrega)
+ Request (multipart/form-data)
  - file: campo referente ao upload do arquivo

+ Response `201` (application/json)
  ```json
  {
    "id": 3,
    "url": "localhost:3333/files/2ecabd84f8b3de8bd951eccd87a331ab.png", // URL do arquivo
    "name": "Wallpaper Bootcamp 10.0 - Mobile.png",
    "path": "2ecabd84f8b3de8bd951eccd87a331ab.png",
    "updatedAt": "2020-02-21T16:36:33.369Z",
    "createdAt": "2020-02-21T16:36:33.369Z"
  }
  ```

# [`PUT` /recipients/{id}]
> Atualiza um destinatário
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID do destinatário | Path | - |

+ Request (application/json)
  ```json
  {
    "name": "",
    "street": "",
    "number": 0,
    "complement": "",
    "state": "",
    "city": "",
    "zipcode": ""
  }
  ```

+ Response `200` (application/json)
  ```json
  {
    "id": 1,
    "name": "Marcelo Augusto",
    "street": "Av Camilo Calazans",
    "number": 64,
    "complement": "Condomínio Rouxinol, casa 04",
    "state": "RN",
    "city": "Caicó",
    "zipcode": "59300-000",
    "createdAt": "2020-02-20T18:51:58.872Z",
    "updatedAt": "2020-02-20T18:53:17.288Z"
  }
  ```

# [`PUT` /deliverymen/{id}]
> Atualiza um entregador
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID do entregador | Path | - |

+ Request (application/json)
  ```json
  {
    "name": "",
    "avatar_id": 0,
    "email": "",
  }
  ```

+ Response `200` (application/json)
  ```json
  {
    "id": 1,
    "name": "Entregador01",
    "avatar_id": 2,
    "email": "entregador@fastfeet.com",
    "createdAt": "2020-02-21T14:31:52.309Z",
    "updatedAt": "2020-02-21T16:15:20.431Z"
  }
  ```

# [`PUT` /deliveries/{id}]
> Atualiza uma encomenda
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID da encomenda | Path | - |

+ Request (application/json)
  ```json
  {
    "product": "",
    "canceled_at": "",
    "start_date": "",
    "end_date": "",
    "recipient_id": 0,
    "deliveryman_id": 0,
    "signature_id": 0
  }
  ```

+ Response `200` (application/json)
  ```json
  {
    "id": 1,
    "product": "Leitor de CD/DVD Externo DELL",
    "canceled_at": null,
    "start_date": null,
    "end_date": null,
    "createdAt": "2020-02-21T19:39:37.302Z",
    "updatedAt": "2020-02-22T13:33:23.433Z",
    "recipient_id": 1,
    "deliveryman_id": 2,
    "signature_id": null
  }
  ```

# [`PUT` /problem/{id}/cancel-delivery]
> Cancela uma encomenda a partir de um problema cadastrado
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID do problema | Path | - |

+ Response `200` (application/json)
  ```json
  {
    "id": 3,
    "product": "X-BOX S",
    "canceled_at": "2020-02-29T14:14:05.750Z",
    "start_date": "2020-02-26",
    "end_date": null,
    "createdAt": "2020-02-26T14:41:29.528Z",
    "updatedAt": "2020-02-29T14:14:05.752Z",
    "recipient_id": 1,
    "deliveryman_id": 2,
    "signature_id": null
  }
  ```

# [`DELETE` /deliverymen/{id}]
> Remove um entregador
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID do entregador | Path | - |

+ Response `204`

# [`DELETE` /deliveries/{id}]
> Remove uma encomenda
+ Parameters
  | Parameter | Description | Parameter Type     | Default Value  |
  |-----------|-------------|--------------------|---------------|
  | id        | ID do entregador | Path | - |

+ Response `204`
