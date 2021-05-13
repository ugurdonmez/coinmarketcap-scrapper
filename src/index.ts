import { getAllCoins, getPrice } from './helper/helpers'
import { BigQuery } from '@google-cloud/bigquery'
import * as fs from 'fs'

const bigqueryClient = new BigQuery();

getAllCoins().then(coins => {
    console.log(coins.length)

    bigqueryClient
        .dataset('marketcapTest')
        .table('coinmarketcap')
        .insert(coins)
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(JSON.stringify(err))

            fs.writeFile('./err1.json', JSON.stringify(err), (aaa) => {
                if (aaa) {
                    console.log(aaa)
                }
                console.log('written')
            })
        
        })
})
