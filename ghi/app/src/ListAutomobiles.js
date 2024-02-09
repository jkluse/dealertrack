import { useState, useEffect } from "react";

function ListAutomobiles() {
	const [automobiles, setAutomobiles] = useState([]);

	async function fetchAutomobiles() {
		const res = await fetch("http://localhost:8100/api/automobiles/");
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			setAutomobiles(data.autos);
		}
	}

	useEffect(() => {
		fetchAutomobiles();
	}, []);

	return (
		<div className="container my-5">
			<h2>Automobiles</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
						<th>Sold</th>
					</tr>
				</thead>
				<tbody>
					{automobiles.map((a) => (
						<tr key={a.id}>
							<td>{a.vin}</td>
							<td>{a.color}</td>
							<td>{a.year}</td>
							<td>{a.model.name}</td>
							<td>{a.model.manufacturer.name}</td>
							<td>{a.sold ? "Yes": "No"}</td>

						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListAutomobiles;
