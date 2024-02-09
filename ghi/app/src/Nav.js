import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-success">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						dealerTRACK
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Technician
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink
												className="dropdown-item "
												to="technicians/create/"
											>
												Add Technician
											</NavLink>
										</li>
										<li>
											<NavLink className="dropdown-item" to="technicians/">
												List Technicians
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Service
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink
												className="dropdown-item "
												to="appointments/create/"
											>
												Schedule Service Appointment
											</NavLink>
										</li>
										<li>
											<NavLink className="dropdown-item" to="appointments/">
												Appointments
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="appointments/history/"
											>
												Service History
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Manufacturers
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="manufacturers/">
												Manufacturer List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="manufacturers/create/"
											>
												Create Manufacturer
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Models
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="models/">
												Model List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="models/create/"
											>
												Create Model
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Automobiles
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="automobiles/">
												Automobile List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="automobiles/create/"
											>
												Create Automobile
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Salespersons
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="salespersons/">
												Salespersons List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="salespersons/create/"
											>
												Create Salesperson
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Customers
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="customers/">
												Customer List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="customers/create/"
											>
												Create Customer
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item ">
								<div className="btn-group">
									<button
										type="button"
										className="btn btn-success dropdown-toggle"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Sales
									</button>
									<ul className="dropdown-menu">
										<li>
											<NavLink className="dropdown-item " to="sales/">
												Sales List
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="sales/create/"
											>
												Create Sale
											</NavLink>
										</li>
										<li>
											<NavLink
												className="dropdown-item"
												to="sales/history/"
											>
												Salesperson History
											</NavLink>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
