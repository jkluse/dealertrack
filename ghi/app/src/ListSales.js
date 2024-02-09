import { useState, useEffect } from "react"

function ListSales() {
  const [models, setModels] = useState([]);

	async function fetchModels() {
		const res = await fetch("http://localhost:8100/api/models/");
		if (res.ok) {
			const data = await res.json();
			console.log(data);
			setModels(data.models);
		}
	}

	useEffect(() => {
		fetchModels();
	}, []);

	return (
		<div className="container my-5">
			<h2>Manufacturers</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Manufacturer</th>
						<th>Picture</th>
					</tr>
				</thead>
				<tbody>
					{models.map((m) => (
						<tr key={m.id}>
							<td>{m.name}</td>
							<td>{m.manufacturer.name}</td>
							<td>
								<img
									style={{ height: "80px" }}
									src={m.picture_url}
									alt={`${m.name} ${m.manufacturer.name}`}
								></img>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ListSales
