import { useState, useEffect } from "react"
function ListCustomers() {
  const [customers, setCustomers] = useState([]);

	async function fetchCustomers() {
		const res = await fetch("http://localhost:8090/api/customers/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setCustomers(data.customers);
		}
	}

	useEffect(() => {
		fetchCustomers();
	}, []);
	return (
		<div className="container my-5">
			<h2>Customers</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Phone Number</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((c) => (
						<tr key={c.id}>
							<td>{c.first_name}</td>
							<td>{c.last_name}</td>
							<td>{c.address}</td>
							<td>{c.phone_number}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListCustomers
