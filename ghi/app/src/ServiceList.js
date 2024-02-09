import { useState, useEffect } from "react";

function ServiceList() {
	const [appointments, setAppointments] = useState([]);

	async function fetchAppointments() {
		const res = await fetch("http://localhost:8080/api/appointments/");
		if (res.ok) {
			const data = await res.json();
			console.log(data)
			const filteredData = data.appointments.filter(appt => appt.status === 'created')

			setAppointments(filteredData);
		}
	}

	useEffect(() => {
		fetchAppointments();
	}, []);

	async function cancelAppointment(e) {
		const id = e.target.value
    const locationUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
		const fetchConfig = {
			method: "PUT",
		};


		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
      fetchAppointments()
		} else {
			let message = await response.json();
			console.log(message);
		}
	}

  async function finishAppointment(e) {
		const id = e.target.value
    const locationUrl = `http://localhost:8080/api/appointments/${id}/finished/`
		const fetchConfig = {
			method: "PUT",
		};
    const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
      fetchAppointments()
		} else {
			let message = await response.json();
			console.log(message);
    }
  }
	console.log(appointments)
	return (
		<div className="container my-5">
			<h2>Service Appointments</h2>
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
							<td>
								<button
									onClick={cancelAppointment}
									className="btn btn-danger"
									value={appt.id}
								>
									Cancel
								</button>
							</td>
							<td>
								<button onClick={finishAppointment} className="btn btn-success" value={appt.id}>
									Finish
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ServiceList;
