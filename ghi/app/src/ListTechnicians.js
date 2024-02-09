import { useEffect, useState } from "react";

function ListTechnicians() {
	const [technicians, setTechnicians] = useState([]);



	async function fetchTechs() {
		const res = await fetch("http://localhost:8080/api/technicians/");
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			setTechnicians(data.technicians);
		}
	}

	useEffect(() => {
		fetchTechs();
	}, []);

	return (
		<div className="container my-5">
			<h2>Technicians</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{technicians.map((tech) => (
						<tr>
							<td>{tech.employee_id}</td>
							<td>{tech.first_name}</td>
							<td>{tech.last_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListTechnicians;
