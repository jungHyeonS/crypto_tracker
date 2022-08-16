import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { fetchCoinHistory } from "../api/api";
import ApexChart from "react-apexcharts"

interface ChartProps{
    coinId:string;
}

interface ICoinItem{
    time_open: number,
    time_close: number,
    open: string,
    high: string,
    low: string,
    close:string,
    volume: string,
    market_cap: number,
}

function Chart({coinId}:ChartProps){
    const {isLoading,data} = useQuery<ICoinItem[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId),{
        refetchInterval:5000
    })
    
    return (
        <div>
            {isLoading ? "Loading.." : <ApexChart
            type="line"
            series={[
                {
                    name:"price",
                    //series 는 배열만 받아야되는 data? 를 하면 읽어오면 number 배열 못읽어오면 undeifed가 되어서 형식을 강제한다
                    data:data?.map((price) => price.close) as []
                }
            ]}
            options={{
                theme:{
                    mode:"dark"
                },
                chart:{
                    height: 500,
                    width: 500,
                    background: "transperent",
                    toolbar:{
                        show:false
                    }
                },
                grid:{show:false},
                stroke: {
                    curve:"smooth",
                    width: 4
                },
                yaxis:{
                    show:false
                },
                xaxis:{
                   labels:{
                    show:false,
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: "MMM 'yy",
                        day: 'dd MMM',
                        hour: 'HH:mm',
                    },
                   },
                   axisTicks:{
                    show:false
                   },
                   axisBorder:{
                    show:false
                   },
                   type:"datetime",
                   categories:data?.map((price) => {
                    return price.time_close
                    // new Date(price.time_close)
                   }) as []
                },
                fill: {
                    type:"gradient",
                    gradient:{gradientToColors:["#0be881"],stops:[0,100]}
                },
                colors:["#0fbcf9"],
                tooltip:{
                    y:{
                        formatter:(value)=>`$${value.toFixed(3)}`
                    }
                }
            }}
            />}
        </div>
    )
}

export default Chart