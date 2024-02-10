import { useState, useEffect } from "react";

function ServiceHistory() {
	const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("")
	const [filteredAppointments, setFilteredAppointments] = useState([])
	const [filterField, setFilterField] = useState('VIN')

	async function fetchAppointments() {

    const res = await fetch("http://localhost:8080/api/appointments/");
		if (res.ok) {
      const data = await res.json();
			// console.log(data)
			setAppointments(data.appointments);
			setFilteredAppointments(data.appointments);
		}
	}

	useEffect(() => {
		fetchAppointments();
	}, []);

  async function handleSearchChange(e){
		const searchVal = e.target.value
		setSearchText(searchVal)
		if (searchVal === ''){
			setFilteredAppointments(appointments)
		} else {
			if (filterField === "Technician"){
				setFilteredAppointments(appointments.filter(appt => (
					appt[filterField.toLowerCase()].first_name.toUpperCase().startsWith(searchVal.toUpperCase())
				)))
			} else{
				setFilteredAppointments(appointments.filter(appt => (
					appt[filterField.toLowerCase()].toUpperCase().startsWith(searchVal.toUpperCase())
				)))
			}
		}
  }

	function handleFilterFieldChange(e){
		e.preventDefault()
		setFilteredAppointments(appointments)
		setSearchText("")
		e.target.value = ""
		const property = e.target.getAttribute("data-value")
		setFilterField(property)
	}


	return (
		<div className="container my-5">
			<h2>Service History</h2>
			<div className="input-group mb-3">
        <input onChange={handleSearchChange} value={searchText} type="text" placeholder="Search" className="form-control" aria-label="Text input with dropdown button" />
        <button className="btn btn-outline-secondary dropdown-toggle btn-outline-success" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {filterField}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="." data-value="VIN" onClick={handleFilterFieldChange}>VIN</a></li>
            <li><a className="dropdown-item" href="." data-value="Customer" onClick={handleFilterFieldChange}>Customer</a></li>
            <li><a className="dropdown-item" href="." data-value="Technician" onClick={handleFilterFieldChange}>Technician</a></li>
            <li><hr className="dropdown-divider" /></li>

        </ul>
    </div>

			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>VIN</th>
						<th>Is VIP</th>
						<th>Customer</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{filteredAppointments.map((appt) => (
						<tr key={appt.id}>
							<td>{appt.vin}</td>
							<td>{appt.isVIP ? "Yes": "No"}</td>
							<td>{appt.customer}</td>
							<td>{new Date(appt.date_time).toLocaleDateString()}</td>
							<td>{new Date(appt.date_time).toLocaleTimeString()}</td>
							<td>
								{appt.technician.first_name} {appt.technician.last_name}
							</td>
							<td>{appt.reason}</td>
							<td>{appt.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ServiceHistory;
