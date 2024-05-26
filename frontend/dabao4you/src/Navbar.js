import { Link } from "react-router-dom";
import { Heart } from "react-bootstrap-icons";
import { BagDash } from "react-bootstrap-icons";
import { PersonCircle } from "react-bootstrap-icons";
import { Search } from "react-bootstrap-icons";

const Navbar = () => {
  return (
    <nav className="d-flex navbar navbar-expand-md navbar-light pb-4 shadow" >
        <div className="container-md">
    
          <Link to = "/MainPage" className="btn m-1">
            <Heart/>
          </Link>
          <Link to = "/AcceptedTasks" className="btn m-1">
            <Search/>
          </Link>
          <Link to = "Chat" className="btn m-1">
            <BagDash/>
          </Link>
          <Link to = "Home" className="btn m-1">
            <PersonCircle/>
          </Link>
          </div>
          
    </nav>
  );
}
 
export default Navbar;