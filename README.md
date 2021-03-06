# pagarmePSP
Desafio técnico proposto da PagarMe e Stone Mais visando o desenvolvimento de um sistema PSP simplificado.

## Instruções:
#### 1- Clone o repositório;

Clone o repositório com ```git clone https://github.com/avilabiel/pagarmePSP.git```

#### 2- Iniciar o serviço

Instale os requisitos necessários com npm ```npm -i``` ou yarn ```yarn install```. Após isso, execute ```yarn start-dev``` para iniciar o serviço no ambiente de desenvolvimento.

#### 3- Banco de dados

Estou usando uma versão free que demora um pouco nas requisições, podendo até dar um timeout. Caso isto ocorra, tente novamente que funcionará. Arrumarei o banco de dados nas próximas versões. Caso queira usar um banco MySQL local, fique à vontade, porém altere os arquivos .env.development com as configurações corretas. Após isso, rode ```yarn sequelize db:migration```.

#### 4- Utilize as rotas na seguinte ordem:

    a. Cadastro;
    b. Login;
    c. Registrar transação cliente;
    d. Listar transação cliente;
    e. Listar pagamentos


##### Cadastro

Para cadastrar um novo cliente faça um ```POST``` para ```http://localhost:5000/v1/client``` com o body:
    ```
    {
        "nome": "Verdevaldo",
        "email": "verdevaldo@gmail.com",
        "senha": "123mudar"
    }
    ```
> Os campos podem ser editados, porém devem seguir esta estrutura de chaves.

#### 5- Simule um erro no ambiente de desenvolvimento

De acordo com o OWASP e os padrões de segurança para aplicativos web, os erros internos devem ser ocultos, dificultando as dicas e os caminhos para usuários mal intencionados, porém, esta regra não se aplica ao ambiente de desenvolvimento, onde usei o Youch para detalhar bem o erro, facilitando na sua resolução.

Para simular um erro na execução:

> Obs: Todos os erros são levados para o Rollbar, um sistema que recebe os erros e cria alguns reports gráficos e facilita as resoluções dos mesmos. É uma ótima ferramenta! Para entrar no Rollbar:
    
    a. Acesse https://rollbar.com/
    b. Usuário: avilagithub
    c. Senha: 123mudar

#### 6- Simule um erro no ambiente de produção

Na produção os erros internos e inesperados não devem aparecer de maneira alguma! Por esta razão, simulei um erro como se fosse na produção, onde aparece o status 500, a mensagem de erro interno ao cliente e a mensagem do verdadeiro erro no Rollbar.

> Obs: Todos os erros são levados para o Rollbar, um sistema que recebe os erros e cria alguns reports gráficos e facilita as resoluções dos mesmos. É uma ótima ferramenta! Para entrar no Rollbar:
    
    a. Acesse https://rollbar.com/
    b. Usuário: avilagithub
    c. Senha: 123mudar

#### 7- Realize os testes para CI/CD executando o comando "yarn test"

Os testes ainda não estão prontos, mas estarão na próxima versão.
