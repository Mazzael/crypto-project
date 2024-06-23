# Requisitos e Regras de Negócio

1. Registro de Usuário

Requisito: 

[x] O sistema deve permitir que novos usuários se registrem com um nome de usuário, senha e email.

Regra de Negócio:

[x] O nome de usuário deve ser único.
[x] A senha deve ser armazenada de forma segura (hashed).
[x] O email deve ser válido e único no sistema.

2. Autenticação de Usuário

Requisito: 

[x] O sistema deve permitir que usuários registrados façam login usando seu nome de usuário e senha.

Regra de Negócio:

[x] O sistema deve verificar a combinação de nome de usuário e senha.
[x] O sistema deve manter sessões de usuário seguras, usando tokens (JWT) ou cookies seguros.

3. Criação de Alertas de Preço

Requisito:

[x] O sistema deve permitir que os usuários criem alertas de preço para ações específicas.

Regra de Negócio:

[x] Um usuário pode criar múltiplos alertas.
[x] Cada alerta deve ter um preço alvo e uma ação associada.
[x] O alerta deve ser armazenado como ativo por padrão.

4. Listagem de Alertas

Requisito: 

[x] O sistema deve permitir que os usuários visualizem uma lista de seus alertas de preço.

Regra de Negócio:

[x] A lista deve mostrar todos os alertas criados pelo usuário, ativos e inativos.

5. Deleção de Alertas

Requisito:

[x] O sistema deve permitir que os usuários deletem alertas de preço específicos.

Regra de Negócio:

[x] Apenas o usuário que criou o alerta pode deletá-lo.

6. Monitoramento de Preços de Ações

Requisito: 

- O sistema deve monitorar os preços das ações e verificar se algum preço alvo foi atingido.

Regra de Negócio:

- O sistema deve consultar periodicamente a API da CoinGecko para obter os preços atuais das ações.
- Se o preço atual de uma ação atingir ou exceder o preço alvo de um alerta ativo, o alerta deve ser acionado (desativado) e uma notificação deve ser enviada ao usuário.

7. Notificação de Usuário

Requisito: 

- O sistema deve notificar o usuário quando um alerta de preço é acionado.

Regra de Negócio:

- As notificações podem ser enviadas via email.
- A notificação deve incluir o nome da ação, o preço alvo e o preço atual.

8. Persistência de Dados

Requisito: 

- O sistema deve armazenar dados de usuários e alertas em um banco de dados relacional.

Regra de Negócio:

- Os dados dos usuários e alertas devem ser persistidos de forma segura.
- As informações sensíveis (como senhas) devem ser adequadamente protegidas (ex: hashing de senhas).