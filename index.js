import  express  from 'express';

const porta = 3000;
const host  = '0.0.0.0';

var listaUsuarios=[];

function processaCadastroUsuario(requisicao, resposta){
    //processar os parametros da url em http://localhost:3000/cadastroUsuario.html?login=rafael&senha=123456&confirmaSenha=123456
    const usuario = {
                    login: requisicao.query.login,
                    senha: requisicao.query.senha,
                    confirmaSenha: requisicao.query.confirmaSenha
                    }
//adiciona um novo usuário na lista se usuarios ja cadastrados
listaUsuarios.push(usuario)
//retornar a lista de usuarios
let conteudoResposta =`
<!DOCTYPE html>
<head>
    <meta carset="UTF-8">
    <title>Menu do sistema</title>
</head>
<body>
    <h1>Lista de usuarios cadastrados</h1>
    <table>
        <thead>
            <tr>
                <th>login</th>
                <th>senha</th>
                <th>Confirma Senha</th>
            </tr>
        </thead>        
        <tbody>`;
                    
        for (const usuario of listaUsuarios){
            conteudoResposta +=`
                <tr>
                    <td>${usuario.login}</td>
                    <td>${usuario.senha}</td>
                    <td>${usuario.confirmaSenha}</td>
                <tr>
            `;
        }

        conteudoResposta+=`
        </tbody>
    </table>
    <a href="/" role="button" >Voltar ao Menu</a>
    <a href="/cadastroUsuario.html" role="button">Continuar Cadastrando</a>
</body>
</html>`;
resposta.end(conteudoResposta);
}


const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastroUsuario.html">Cadastrar Usuario</a></li>
                </ul>
            </body>
        </html>
    `);
});

//rota para processar o cadastro de usuarios endpoint = '/cadastrarUsuario

app.get('/cadastroUsuario', processaCadastroUsuario);

app.listen(porta, host, () =>{
    console.log(`Servidor executando na url http//${host}:${porta}`);
});