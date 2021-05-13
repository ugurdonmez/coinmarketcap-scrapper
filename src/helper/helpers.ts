import { Coin } from "../models/coin"
import * as cheerio from 'cheerio'
import axios from 'axios'

const AxiosInstance = axios.create();

export function getPrice(priceStr: string): number {
    let num = Number(priceStr.substring(1).replace(',',''))
    if (num < 0.000001) {
        return 0
    } else {
        return num
    }
    // return Number(priceStr.substring(1).replace(',',''))
}

export function getCoinsFromHtml(html: any, i: number): Coin[] {

    let coins: Coin[] = []

    const $ = cheerio.load(html)

    const coinsTable = $('tr')

    coinsTable.each((order, element) => {
        if (order === 0) {
            // header
            return;
        }

        const price = getPrice($(element).children().eq(3).text())
        const name = $(element).children().eq(2).text()

        let coin: Coin = {
            order: order + (i-1) * 100,
            price: getPrice($(element).children().eq(3).text()),
            name: $(element).children().eq(2).text(),
            date: new Date().toISOString().split('T')[0],
        }

        coins.push(coin)
    })

    return coins
}

export async function getPage(pageNumber: number): Promise<any> {
    return await AxiosInstance.get(`https://coinmarketcap.com/?page=${pageNumber}`)
        .then(response => {
            return response.data as Promise<any>
        })
}

export async function getAllCoins(): Promise<Coin[]> {

    let coins: Coin[] = []

    for (let i = 1; i <= 50; i++) {
        let html = await getPage(i)
        let array = getCoinsFromHtml(html,i)
        coins.push(...array)
        console.log(i + 'array size ' + coins.length)
    }

    return coins
}