
import { Link } from "react-router-dom";
import styled from "styled-components"

const Continer = styled.div`
    padding: 0 20px;
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
        padding: 20px;
        transition: color 0.2s ease-in;
        display: block;
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

const coins = [
    {
        name:"btn",
        symbol:"btn",
        id:1
    },
    {
        name:"hex",
        symbol:"hex",
        id:2
    },
    {
        name:"unak",
        symbol:"unak",
        id:3
    }
]

function Coins(){
    return (
        <Continer>
            <Header>
                <Title>코인</Title>
            </Header>
            <ConinsList>
                {coins.map(coin => <Coin key={coin.id}>
                    <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                </Coin>)}
            </ConinsList>
        </Continer>
    )
}

export default Coins