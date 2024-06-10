# Configuração Teste Prático Desenvolvedor Back-end


## Configurações iniciais
1. Instalar dependencias 
`composer install`

2. Duplicar o arquivo `.env.example` e renomear para `.env`

3. Iniciar o docker
`docker compose up`.

4. É necessário executar os comandos dentro do docker
 - Conectar no docker via bash
 `docker exec -it backend-api-laravel.test-1 bash`
 - Criar as tabelas no banco de dados
  `php artisan migrate`
 - Criar a chave JWT
 `php artisan jwt:secret`
#
# Controllers
## InscricaoController
* Responsável pelos métodos de `Inscrição` dos participantes

# Tables
*  Segue um link para verificar como está a UML do banco.
`https://dbdiagram.io/d/66628a699713410b05fc7dd3`

# Models

## Inscricao
# Rotas relacionadas ao usuário
* POST /api/inscricao  `Rota de cadastro de inscricao`

```
{
	"id_evento_tbi": 1,
	"nome_inscricao_tbi": "Nome do participante",
	"cpf_inscricao_tbi": "cpf do participante",
	"email_inscricao_tbi": "email do participante"
}

```

* GET /api/inscricao  `Rota que retorna os inscritos`


# Teste feito utilizando Laravel 11, Docker e Mysql








