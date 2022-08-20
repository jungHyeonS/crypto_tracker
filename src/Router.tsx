
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"

interface IRouterProps{
    toggleDark : () => void;
    isDark:boolean
}

function Router({toggleDark,isDark}:IRouterProps){
    return <BrowserRouter>
        <Routes>
            <Route path="/:coinId/*" element={<Coin isDark={isDark}></Coin>}></Route>
            <Route path="/" element={<Coins toggleDark={toggleDark}></Coins>}>

            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router