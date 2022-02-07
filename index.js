var twit = require("twit");
const moment = require("moment");
require("dotenv").config();

const BotUFOP = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

const datasComemorativasUFOP = [
  [
    `Início do período letivo de 2021/2 na UFOP.\n\nData postagem: ${moment().format(`DD/MM/YYYY`)}\nData prevista: 15/03/2022`,
    moment(`15/03/2022`, `DD/MM/YYYY`),
  ],
  // ["FIM do semestre 2021.2 da UFOP.", new Date(`2022 / 06 / 25`)],
  [
    `Solicitação do 1º Ajuste de Matrícula na UFOP.\n\nData postagem: ${moment().format(`DD/MM/YYYY`)}\nData prevista: 14/02/2022`,
    moment(`14/02/2022`, `DD/MM/YYYY`),
  ],
];

function BotDataUFOP() {
  let dataHoje = moment();

  for (const [nomeEvento, dataEvento] of datasComemorativasUFOP) {
    if (dataHoje.format(`DD/MM/YYYY`) > dataEvento.format(`DD/MM/YYYY`)) {
      console.log(
        `Script precisa de atualização. Favor verificar o calendario academico vigente!`
      );
    } else {
      if (Concluiu(dataHoje, dataEvento)) {
        console.log(`Atenção: HOJE é ${nomeEvento}`);
        let tweet = `ATENÇÃO: HOJE é ${nomeEvento}`;
        Tweetar(tweet, BotUFOP);
      } else {
        if (DiferencaData(dataHoje, dataEvento) + 1 > 50) {
          if (AntiSpam(DiferencaData(dataHoje, dataEvento) + 1, 5)) {
            let tweet =
              "Faltam " +
              (DiferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            Tweetar(tweet, BotUFOP);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else if (DiferencaData(dataHoje, dataEvento) + 1 > 30) {
          if (AntiSpam(DiferencaData(dataHoje, dataEvento) + 1, 3)) {
            let tweet =
              "Faltam " +
              (DiferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            Tweetar(tweet, BotUFOP);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else if (DiferencaData(dataHoje, dataEvento) + 1 > 7) {
          if (AntiSpam(DiferencaData(dataHoje, dataEvento) + 1, 2)) {
            let tweet =
              "Faltam " +
              (DiferencaData(dataHoje, dataEvento) + 1) +
              " dias para " +
              `${nomeEvento}`;
            console.log(tweet);
            Tweetar(tweet, BotUFOP);
          } else {
            console.log(`Afim de evitar SPAM, tweet cancelado.`);
          }
        } else {
          let aux1, aux2;
          if ((DiferencaData(dataHoje, dataEvento) + 1) === 1) {
            aux1 = " dia";
            aux2 = "Falta ";
          } else {
            aux1 = " dias";
            aux2 = "Faltam ";
          }
          let tweet =
            `${aux2}` +
            (DiferencaData(dataHoje, dataEvento) + 1) +
            `${aux1}` +
            " para " +
            `${nomeEvento}`;
          console.log(tweet);
          Tweetar(tweet, BotUFOP);
        }
      }
    }
  }
}

function Concluiu(dataHoje, dataComemorativa) {
  if (dataHoje.isSame(moment(dataComemorativa, "DD/MM/YYYY"), "day")) {
    return true;
  } else {
    return false;
  }
}

function DiferencaData(dataHoje, dataComemorativa) {
  var diferencaDataMS = moment(dataComemorativa, "DD/MM/YYYY HH:mm:ss").diff(
    moment(dataHoje, "DD:MM/YYYY HH:mm:ss")
  );
  var diferencaData = moment.duration(diferencaDataMS).asDays();

  return parseInt(diferencaData);
}

function Tweetar(tweet, botUniversidade) {
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

function AntiSpam(diferenca, multiplo) {
  if (diferenca % multiplo == 0) {
    return true;
  } else {
    return false;
  }
}

BotDataUFOP();
