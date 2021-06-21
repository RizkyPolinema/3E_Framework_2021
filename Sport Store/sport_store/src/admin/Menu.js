import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="/" className="brand-link" align="center">
                    <span className="brand-text font-weight-light"><i class="fas fa-basketball-ball" /> Sport store</span>
                    </a>
                    {/* Sidebar */}

                    <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                        <a href="sidebar" className="d-block">Admin</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library */}
                            <li className="nav-item">
                                <a href="sidebar" className="nav-link">
                                    <Link to="/">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </a>                                
                            </li>
                            
                            <li className="nav-item">                                
                                <a href="sidebar"  className="nav-link">
                                    <Link to="/databarang">
                                        <i className="nav-icon fa fa-book" />
                                        <p>
                                            Data Buku
                                        </p>
                                    </Link>
                                </a>                                
                            </li>                  
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        )
    }
}