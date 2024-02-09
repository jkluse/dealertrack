import { useState, useEffect } from "react";


function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

	async function fetchManufacturers() {
		const res = await fetch("http://localhost:8100/api/manufacturers/");
		if (res.ok) {
			const data = await res.json();

			setManufacturers(data.manufacturers);
		}
	}

	useEffect(() => {
		fetchManufacturers();
	}, []);



	return (
		<div className="container my-5">
			<h2>Manufacturers</h2>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((man) => (
						<tr key={man.id}>
							<td>{man.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default ManufacturerList
