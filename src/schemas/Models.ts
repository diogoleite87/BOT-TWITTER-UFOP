import { Moment } from 'moment'

type DataTwitKeyProps = {
    consumer_key: string,
    consumer_secret: string,
    access_token: string,
    access_token_secret: string,
    timeout_ms: number
}

type CommemorativeDate = {
    message: string,
    date: Moment
}

export {
    DataTwitKeyProps,
    CommemorativeDate
}
