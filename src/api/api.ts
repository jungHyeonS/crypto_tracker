
const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoin(){
    return await(await fetch(`${BASE_URL}/coins`)).json()
   
}

export async function fetchCoinInfo(coinId:string){
    return await(await fetch(`${BASE_URL}/coins/${coinId}`)).json()
}

export async function fetchCoinTickers(coinId:string){
    return await(await fetch(`${BASE_URL}/tickers/${coinId}`)).json()
}

export function fetchCoinHistory(coinId:string){
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60*60*24*7


    return fetch(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}&start=${startDate}&end=${endDate}`
    ).then((response) => response.json())
    // return await(await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}&start=${startDate}&end=${endDate}`)).json()
}