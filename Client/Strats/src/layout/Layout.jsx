import {  useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { SideBarContextProvider } from "../Contexts/MapContext";
export default function Layout({children}){
    const [showMenu, setShowMenu] = useState(false);
        return(
            <SideBarContextProvider value={showMenu}>
            <div>
                <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
            </div>
                {children}
            </SideBarContextProvider>
        )
}