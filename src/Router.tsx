
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"

interface IRouterProps{
}

function Router({}:IRouterProps){
    return <BrowserRouter>
        <Routes>
            <Route path="/:coinId/*" element={<Coin ></Coin>}></Route>
            <Route path="/" element={<Coins ></Coins>}>

            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router