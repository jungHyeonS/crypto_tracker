import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import { fetchCoinInfo, fetchCoinTickers } from "../api/api";
import Chart from "./Chart";
import Price from "./Price";

import {Helmet} from "react-helmet"

const Continer = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
`

const OverView = styled.div`
  display  : flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 10px 20px;
    border-radius: 10px;
`;

const OverViewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{isActive :boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color:${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a{
        display: block;
    }
`

const Description = styled.p`
    margin: 20px 0px;
`


interface Params {
    coinId : string
}
interface LocationState{
    state : {
        name : string
    }
}

interface IInfoData{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
    description:string,
    message:string,
    open_source:string,
    started_at:string,
    development_status:string,
    harware_wallet:boolean,
    proof_type:string,
    org_structure:string,
    hash_algorithm:string
    first_data_at:string,
    last_data_at:string
}


interface IPriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
            ath_date: string;
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
        }
    };
}

function Coin(){
    const {coinId} = useParams() as unknown as Params
    const {state} = useLocation() as unknown as LocationState;


    // const [loading,setLoading] = useState(true)
    // const [info,setInfo] = useState<IInfoData>()
    // const [price,setPrice] = useState<IPriceData>();

    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    // useEffect(()=>{
    //     (async() => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
    //         console.log(infoData)
    //         const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
    //         console.log(priceData)
    //         setInfo(infoData);
    //         setPrice(priceData)
    //         setLoading(false)
    //     })()
    // },[coinId])


    const {isLoading:infoLoading,data:infoData} = useQuery<IInfoData>(["info",coinId],() => fetchCoinInfo(coinId))
    const {isLoading:tickersLoading,data:tickersData} = useQuery<IPriceData>(["tickers",coinId],
    () => fetchCoinTickers(coinId),{
        refetchInterval:5000
    })

    const loading = infoLoading || tickersLoading
    return (
        <Continer>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>
            </Header>
            {loading ? (<Loader>Loading..</Loader>) : (
                <>
                    <OverView>
                        <OverViewItem>
                            <span>RANK:</span>
                            <span>{infoData?.rank}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverViewItem>
                        <OverViewItem>
                            <span>Price:</span>
                            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverViewItem>
                    </OverView>
                    <Description>{infoData?.description}</Description>
                    <OverView>
                        <OverViewItem>
                                <span>Total Supply:</span>
                                <span>{tickersData?.total_supply}</span>
                        </OverViewItem>
                        <OverViewItem>
                                <span>Max Supply:</span>
                                <span>{tickersData?.max_supply}</span>
                        </OverViewItem>
                    </OverView>

                    <Tabs>
                        <Tab isActive={chartMatch !== null ? true : false}>
                            <Link to={`/${coinId}/chart`}>chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null ? true : false}>
                            <Link to={`/${coinId}/price`}>price</Link>
                        </Tab>
                    </Tabs>
                    
                    

                    <Routes>
                        <Route path="price" element={<Price/>}></Route>
                        <Route path="chart" element={<Chart coinId={coinId}/>}></Route>
                    </Routes>
                </>
            )}
        </Continer>
    )
}

export default Coin