# Requisitos e Regras de Negócio

### Registro de Usuário

## Requisito: 

- [x] O sistema deve permitir que novos usuários se registrem com um nome de usuário, senha e email;

## Regra de Negócio:

- [x] O nome de usuário deve ser único;
- [x] A senha deve ser armazenada de forma segura (hashed);
- [x] O email deve ser válido e único no sistema;

## Autenticação de Usuário

### Requisito: 

- [x] O sistema deve permitir que usuários registrados façam login usando seu nome de usuário e senha;

### Regra de Negócio:

- [x] O sistema deve verificar a combinação de nome de usuário e senha;
- [x] O sistema deve manter sessões de usuário seguras, usando tokens (JWT) ou cookies seguros;

## Criação de Alertas de Preço

### Requisito:

- [x] O sistema deve permitir que os usuários criem alertas de preço para cryptos específicas;

### Regra de Negócio:

- [x] Um usuário pode criar múltiplos alertas;
- [x] Cada alerta deve ter um preço alvo e uma crypto associada;
- [x] O alerta deve ser armazenado como ativo por padrão;

## Listagem de Alertas

### Requisito: 

- [x] O sistema deve permitir que os usuários visualizem uma lista de seus alertas de preço;

### Regra de Negócio:

- [x] A lista deve mostrar todos os alertas criados pelo usuário, ativos e inativos;

## Deleção de Alertas

### Requisito:

- [x] O sistema deve permitir que os usuários deletem alertas de preço específicos;

### Regra de Negócio:

- [x] Apenas o usuário que criou o alerta pode deletá-lo;

## Monitoramento de Preços de Cryptos

### Requisito: 

- [x] O sistema deve monitorar os preços das cryptos e verificar se algum preço alvo foi atingido;

### Regra de Negócio:

- [x] O sistema deve consultar periodicamente a API da CoinGecko para obter os preços atuais das cryptos;
- [x] Se o preço atual de uma crypto atingir ou exceder o preço alvo de um alerta ativo, o alerta deve ser acionado (desativado) e uma notificação deve ser enviada ao usuário;

## Notificação de Usuário

### Requisito: 

- [x] O sistema deve notificar o usuário quando um alerta de preço é acionado;

### Regra de Negócio:

- [x] As notificações podem ser enviadas via email;
- [x] A notificação deve incluir o nome da crypto, o preço alvo e o preço atual;

## Persistência de Dados

### Requisito: 

- [x] O sistema deve armazenar dados de usuários e alertas em um banco de dados relacional;

### Regra de Negócio:

- [x] Os dados dos usuários e alertas devem ser persistidos de forma segura;
- [x] As informações sensíveis (como senhas) devem ser adequadamente protegidas (ex: hashing de senhas);