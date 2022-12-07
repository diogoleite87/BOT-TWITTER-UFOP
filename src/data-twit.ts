import 'dotenv/config'
import DataTwitKey from 'twit'

import { DataTwitKeyProps } from './schemas'

export const AppDataTwit = new DataTwitKey(<DataTwitKeyProps>{
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
})