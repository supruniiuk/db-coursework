import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-warning pt-4 ps-5 pe-5 pb-4">
      <a class="navbar-brand" href="/">
        TaxiCall
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <li class="navbar-item">
            <NavLink exact to="/clients" className="nav-item nav-link">
              Clients
            </NavLink>
          </li>
          <li class="navbar-item">
            <NavLink to="/dispatchers" className="nav-item nav-link">
              Dispatchers
            </NavLink>
          </li>
          <li class="navbar-item">
            <NavLink to="/drivers" className="nav-item nav-link">
              Drivers
            </NavLink>
          </li>
          <li class="navbar-item">
            <NavLink to="/orders" className="nav-item nav-link">
              Orders
            </NavLink>
          </li>
        </div>

        <form class="form-inline my-2 my-lg-0">
          <NavLink to="/auth" className="btn btn-dark btn-space">
            Login
          </NavLink>
          <NavLink to="/auth" className="btn btn-dark">
            Register
          </NavLink>
        </form>
      </div>
    </nav>
  );
}
