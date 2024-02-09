import { useState, useEffect } from "react";

function ListSalespersons() {
	const [salespeople, setSalespeople] = useState([]);

	async function fetchSalesPeople() {
		const res = await fetch("http://localhost:8090/api/salespeople/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setSalespeople(data.salespeople);
		}
	}

	useEffect(() => {
		fetchSalesPeople();
	}, []);
	return (
		<div className="container my-5">
			<h2>Salespeople</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{salespeople.map((s) => (
						<tr key={s.id}>
							<td>{s.employee_id}</td>
							<td>{s.first_name}</td>
							<td>{s.last_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListSalespersons;
