# BOT TWITTER UFOP

> Bot construído utilizando API do Twitter e JavaScript (Recentemente refatorado em TypeScript)!

<h4>Bot construído para lembrar a comunidade acadêmica de datas especiais com postagens scriptadas!</h4>
<h4>Bot hosteado pela Heroku e ativado diariamente as 9:00AM, fazendo as verificações e as postagens se necessario.</h4>
<h4>Para visualizar o perfil do Bot, copie ou clique no link: <a href="https://twitter.com/bot_ufop">twitter.com/bot_ufop</a></h4>
<h2>Features:</h2>
<ul>
    <li>Função que reduz o Spam na timeline dos seguidores do Bot;</li>
    <li>Sinalização quando chegar o evento/data;</li>
    <li>Contagem de dias restantes para data em questão;</li>
    <li>Toda postagem possui a data que foi postada e a data prevista.</li>
</ul>
    <div><img alt="Readme" title="Readme" src="./img/post.png" width="100%"/></div>

<h2>Como executar 🏃‍</h2>

```bash
# Clone este repositório
$ git clone https://github.com/diogoleite87/BOT-TWITTER-UFOP.git

# Acessa a pasta do Backend no terminal
$ cd BOT-TWITTER-UFOP

# Instale as dependências
$ yarn

# Crie um arquivo .env, insira os dados do seu App criado no developer.twitter.com
.env : CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN e ACCESS_TOKEN_SECRET

# Execute a aplicação
$ yarn dev

# A aplicação iniciará e será feita as verificações de acordo com horários e datas inseridas
# Lembrando que você pode adicionar, remover e ou editar datas alterando o array de objetos CommemorativeDates no index.ts

```
