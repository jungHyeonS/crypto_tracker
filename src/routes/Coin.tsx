import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
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


interface Params {
    coinId : string
}
interface LocationState{
    state : {
        name : string
    }
}

function Coin(){
    const {coinId} = useParams() as unknown as Params
    const [loading,setLoading] = useState(true)

    const {state} = useLocation() as unknown as LocationState;

    const [info,setInfo] = useState({})
    const [price,setPrice] = useState({});

    useEffect(()=>{
        (async() => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
            setInfo(infoData);
            setPrice(priceData)
        })()
    },[])

    console.log(coinId)
    return (
        <Continer>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? (<Loader>Loading..</Loader>) : null}
        </Continer>
    )
}

export default Coin