import { useState, useEffect } from "react"

function ListSales() {
  const [sales, setSales] = useState([]);

	async function fetchModels() {
		const res = await fetch("http://localhost:8090/api/sales/");
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			setSales(data.sales);
		}
	}

	useEffect(() => {
		fetchModels();
	}, []);

	return (
		<div className="container my-5">
			<h2>Sales</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Salesperson Employee ID</th>
						<th>Salesperson Name</th>
						<th>Customer</th>
						<th>VIN</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{sales.map((s) => (
						<tr key={s.id}>
							<td>{s.salesperson.employee_id}</td>
							<td>{s.salesperson.first_name} {s.salesperson.last_name}</td>
							<td>{s.customer.first_name} {s.customer.last_name}</td>
              <td>{s.automobile.vin}</td>
              <td>{s.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListSales
