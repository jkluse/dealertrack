import { useState, useEffect } from "react";

function ServiceHistory() {
	const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("")

	async function fetchAppointments() {

    const res = await fetch("http://localhost:8080/api/appointments/");
		if (res.ok) {
      const data = await res.json();
      const filteredData = data.appointments.filter(appt => (
        appt.vin.toLowerCase().includes(searchText)
      ))
      console.log('data', filteredData)
			setAppointments(filteredData);
		}
	}

	useEffect(() => {
		fetchAppointments();
	}, []);

  async function handleSearchChange(e){
    await setSearchText(e.target.value)
    fetchAppointments(e.target.value)
  }


	return (
		<div className="container my-5">
			<h2>Service Appointments</h2>
      <form className="d-flex">
        <input onChange={handleSearchChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
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
					{appointments.map((appt) => (
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
