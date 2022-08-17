import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api/api"
import { ChartProps } from "../interface/ChartProps"
import { ICoinItem } from "../interface/CoinItem"
import ApexChart from "react-apexcharts"

function Price({coinId}:ChartProps){
    const {isLoading,data} = useQuery<ICoinItem[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId),{
        refetchInterval:5000
    })

    return (
        <div>
            {
            isLoading ? "Loading.." : 
            <ApexChart
            type="candlestick"
            series={[
                {
                    name:"price",
                    data: data?.map((price) => {
                        return {
                            x : new Date(price.time_open),
                            y : [price.open,price.high,price.low,price.close]
                        }
                    }) as []

                    // x: new Date(1538877600000),
                    //     y: [6603.07, 6604.5, 6599.09, 6603.89]
                }
            ]}
            options={
                {
                    theme:{
                        mode:"dark"
                    },
                    chart: {
                        type: 'candlestick',
                        height: 350,
                        background: "transperent",
                        toolbar:{
                            show:false
                        }
                      },
                      title: {
                        text: 'CandleStick Chart',
                        align: 'left'
                      },
                      xaxis: {
                        type: 'datetime'
                      },
                      yaxis: {
                        show:false,
                        tooltip: {
                          enabled: true
                        }
                      }
                }
            }
            />
            }
        </div>
    )
}

export default Price