import Navbar from "../components/Navbar/Navbar";
export default function withMainLayout(Component){
    function layout(props){
        return(
            <>
            <div>
                <Navbar />
            </div>
                <Component {...props}/>
            </>
        )
    }
    return layout;
}