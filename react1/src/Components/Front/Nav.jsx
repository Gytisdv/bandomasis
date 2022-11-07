import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="nav">
        <NavLink
          to="/"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'white'
                }
              : {color: 'black'}
          }
        >
          <span className="nav-hover">Sąrašas</span>
        </NavLink>
        <NavLink
          to="/create"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: 'white'
                }
              : {color: 'black'}
          }
        >
          <span className="nav-hover">Sukurti prašyma</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Nav;