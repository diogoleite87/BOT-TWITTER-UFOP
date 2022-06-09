var twit = require("twit");
const moment = require("moment");
require("dotenv").config();

const key = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

const datasComemorativasUFOP = [
  [
    `Término do semestre letivo de 2021/2 na UFOP.\n\nData postagem: ${moment().format(
      `DD/MM/YYYY`
    )}\nData prevista: 25/06/2022\n\nConfira as datas sempre em: https://www.prograd.ufop.br/calendario-academico`,
    moment(`25/06/2022`, `DD/MM/YYYY`),
  ],
  [
    `Fim do prazo para Trancamento de Período e Trancamento de Disciplinas para 2021/2 na UFOP. \n\nData postagem: ${moment().format(
      `DD/MM/YYYY`
    )}\nData prevista: 06/04/2022\n\nConfira as datas sempre em: https://www.prograd.ufop.br/calendario-academico`,
    moment(`06/04/2022`, `DD/MM/YYYY`),
  ],
];

function concluiu(dataHoje, dataComemorativa) {
  if (dataHoje.isSame(moment(dataComemorativa, "DD/MM/YYYY"), "day")) {
    return true;
  } else {
    return false;
  }
}

function diferencaData(dataHoje, dataComemorativa) {
  var diferencaDataMS = moment(dataComemorativa, "DD/MM/YYYY HH:mm:ss").diff(
    moment(dataHoje, "DD:MM/YYYY HH:mm:ss")
  );
  var diferencaData = moment.duration(diferencaDataMS).asDays();

  return parseInt(diferencaData);
}

function tweetar(tweet, botUniversidade) {
  botUniversidade.post(
    `statuses/update`,
    { status: tweet },
    (erro, data, response) => {
      if (!erro) {
        console.log("Tweet postado: " + tweet);
      } else {
        console.log("\nErro ao fazer o tweet: " + erro + "\nTweet: " + tweet);
      }
    }
  );
}

function antiSpam(diferenca, multiplo) {
  if (diferenca % multiplo == 0) {
    return true;
  } else {
    return false;
  }
}

function verifica() {
  let dataHoje = moment();

  for (const [nomeEvento, dataEvento] of datasComemorativasUFOP) {
    if (
      dataHoje.dayOfYear() > dataEvento.dayOfYear() ||
      dataHoje.year() > dataEvento.year()
    ) {
      console.log(
        `Script precisa de atualização. Favor verificar o calendario academico vigente!`
      );
    } else {
      if (concluiu(dataHoje, dataEvento)) {
        console.log(`Atenção: HOJE é ${nomeEvento}`);
        let tweet = `ATENÇÃO: HOJE é ${nomeEvento}`;
        tweetar(tweet, key);
      } else {
        if (diferencaData(dataHoje, dataEvento) + 1 > 50) {
          if (antiSpam(diferencaData(dataHoje, dataEvento) + 1, 5)) {
            let tweet =
              "Faltam " +
              (diferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            tweetar(tweet, key);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else if (diferencaData(dataHoje, dataEvento) + 1 > 30) {
          if (antiSpam(diferencaData(dataHoje, dataEvento) + 1, 3)) {
            let tweet =
              "Faltam " +
              (diferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            tweetar(tweet, key);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else if (diferencaData(dataHoje, dataEvento) + 1 > 7) {
          if (antiSpam(diferencaData(dataHoje, dataEvento) + 1, 2)) {
            let tweet =
              "Faltam " +
              (diferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            tweetar(tweet, key);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else {
          let aux1, aux2;
          if (diferencaData(dataHoje, dataEvento) + 1 === 1) {
            aux1 = " dia";
            aux2 = "Falta ";
          } else {
            aux1 = " dias";
            aux2 = "Faltam ";
          }
          let tweet =
            `${aux2}` +
            (diferencaData(dataHoje, dataEvento) + 1) +
            `${aux1}` +
            " para " +
            `${nomeEvento}`;
          console.log(tweet);
          tweetar(tweet, key);
        }
      }
    }
  }
}

verifica();
