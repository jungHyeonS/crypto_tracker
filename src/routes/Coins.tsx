
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoin } from "../api/api";

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

const ConinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color:${props=>props.theme.bgColor};
    margin-bottom: 10px;
    border-radius:15px;
    a{
        align-items: center;
        display: flex;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover{
        a{
            color:${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
`

const Image = styled.img`
    width:35px;
    height  : 35px;
    margin-right: 10px;
`;


interface ICoin {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string
}

function Coins(){
    // const [coins,setCoins] = useState<ICoin[]>([])
    // const [loading,setLoading] = useState(true);
    // useEffect(()=>{
    //     (async() => {
    //         const resposne = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await resposne.json();
    //         setCoins(json.slice(0,100))
    //         setLoading(false)
    //     })()
    // },[])


    //reactquery 는 로딩 값과 api에 데이터값을 리턴해준다
    const {isLoading,data} = useQuery<ICoin[]>(["allCoins"],fetchCoin)

    return (
        <Continer>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (<Loader>Loading..</Loader>) : (<ConinsList>
                {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={{name:coin.name}}>
                        <Image src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </ConinsList>)}
        </Continer>
    )
}

export default Coins