import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom'


class Nav extends Component {
    render() {
        return (
            <div>
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
  <div className="container">
    <a className="navbar-brand js-scroll-trigger" href="#page-top">REACTJS</a>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      Menu
      <i className="fa fa-bars" />
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="/news">News</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="/newsitem">Tin lien quan</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="/contact">Contact</a>
        </li> */}
        
        <li>
          <NavLink to="/news"><bold>News</bold></NavLink>
        </li>
        <li>
        <NavLink to="/newsitem/:slug.:id.html"><bold>Related News</bold></NavLink>
        </li>
        <li>
        <NavLink to="/contact"><bold>Form</bold></NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


            </div>
        );
    }
}

export default Nav;