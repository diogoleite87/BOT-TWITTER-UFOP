import moment, { Moment } from "moment";
import { AppDataTwit } from "./data-twit";
import { CommemorativeDate } from "./schemas";

const CommemorativeDates: CommemorativeDate[] = [
    {
        message: "Término do período para trancamento de 2022/2 na UFOP.",
        date: moment(`22/12/2022`, `DD/MM/YYYY`)
    },
    {
        message: "Término do período letivo de 2022/2 na UFOP.",
        date: moment(`01/04/2023`, `DD/MM/YYYY`)
    },

]

function isToday(currentDate: Moment, commemorativeDate: Moment) {

    return currentDate.isSame(moment(commemorativeDate, "DD/MM/YYYY"), "day")
}

function dateDifference(currentDate: Moment, commemorativeDate: Moment) {
    var msDateDifference = moment(commemorativeDate, "DD/MM/YYYY HH:mm:ss").diff(
        moment(currentDate, "DD:MM/YYYY HH:mm:ss")
    );
    var dateDifference = moment.duration(msDateDifference).asDays();

    return Math.round(dateDifference);
}

function tweetar(tweet: string) {

    AppDataTwit.post(
        `statuses/update`,
        { status: tweet }
    )

    console.log(tweet)
}

function noSpam(dateDifference: number, multiple: number) {
    if (dateDifference % multiple == 0) {
        return true;
    } else {
        return false;
    }
}

function checkDate(currentDate: Moment) {

    for (const { message, date } of CommemorativeDates) {

        if (
            currentDate.dayOfYear() > date.dayOfYear() && currentDate.year() > date.year() ||
            currentDate.dayOfYear() > date.dayOfYear() && currentDate.year() == date.year()
        ) {
            console.log(
                `Script precisa de atualização. Favor verificar o calendario academico vigente!`
            );
        } else {
            if (isToday(currentDate, date)) {
                let tweet = `ATENÇÃO: HOJE é ${message}`;
                tweetar(tweet);
            } else {
                if (dateDifference(currentDate, date) + 1 > 50) {
                    if (noSpam(dateDifference(currentDate, date) + 1, 5)) {
                        let tweet =
                            "Faltam " +
                            (dateDifference(currentDate, date) + 1) +
                            " dias para " +
                            `${message}`;
                        tweetar(tweet);
                    } else {
                        console.log(`Afim de evitar SPAM, tweet cancelado.`);
                    }
                } else if (dateDifference(currentDate, date) + 1 > 30) {
                    if (noSpam(dateDifference(currentDate, date) + 1, 3)) {
                        let tweet =
                            "Faltam " +
                            (dateDifference(currentDate, date) + 1) +
                            " dias para " +
                            `${message}`;
                        tweetar(tweet);
                    } else {
                        console.log(`Afim de evitar SPAM, tweet cancelado.`);
                    }
                } else if (dateDifference(currentDate, date) + 1 > 7) {
                    if (noSpam(dateDifference(currentDate, date) + 1, 2)) {
                        let tweet =
                            "Faltam " +
                            (dateDifference(currentDate, date) + 1) +
                            " dias para " +
                            `${message}`;
                        tweetar(tweet);
                    } else {
                        console.log(`Afim de evitar SPAM, tweet cancelado.`);
                    }
                } else {
                    let day, complement;
                    if (dateDifference(currentDate, date) + 1 === 1) {
                        day = " dia";
                        complement = "Falta ";
                    } else {
                        day = " dias";
                        complement = "Faltam ";
                    }
                    let tweet =
                        `${complement}` +
                        (dateDifference(currentDate, date) + 1) +
                        `${day}` +
                        " para " +
                        `${message}`;
                    tweetar(tweet);
                }
            }
        }
    }
}

function main() {

    var currentDate = moment()

    if (currentDate.format('h') == '9'
        && currentDate.format('mm') == '00'
        && currentDate.format('a') == 'am') {

        console.log('Verificando...')
        checkDate(currentDate)
        setTimeout(main, 60000)

    } else {
        console.log(`${currentDate.format('DD/MM/YYYY h:mm:ss a')}: Ainda não bateu o horário...`)
        setTimeout(main, 10000)
    }

}

main()