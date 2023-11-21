import AllCards from "./components/AllCards/AllCards";
import Cards from "./components/Cards/Cards";

function MainLayout(params) {
    return(
        <>
           <div className="xsm:flex w-full">
              <AllCards/>
           </div>
        </>
    )
}

export default MainLayout;