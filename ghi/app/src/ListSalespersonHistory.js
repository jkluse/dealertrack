import {useState, useEffect} from 'react'

function ListSalespersonHistory() {
  const [sales, setSales] = useState([]);
  const [filter, setFilter] = useState('')
  const [salespeople, setSalespeople] = useState([])
  const [filteredSales, setFilteredSales] = useState([])

	async function fetchSales() {
		const res = await fetch("http://localhost:8090/api/sales/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setSales(data.sales);
      setFilteredSales(data.sales)
		}
	}
  async function fetchSalesPeople() {
		const res = await fetch("http://localhost:8090/api/salespeople/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setSalespeople(data.salespeople);
		}
	}



	useEffect(() => {
		fetchSales();
    fetchSalesPeople();
	}, []);

  function handleFilterChange(e){
    const value = Number(e.target.value);
    // guard clause for when selection is 'choose a salesperson'
    if (value === 0){
      setFilter('')
      setFilteredSales(sales)
      return;
    }
    setFilter(value)
    const filteredSales = sales.filter(sale => sale.salesperson.id === value)
    setFilteredSales(filteredSales)

  }

	return (
		<div className="container my-5">
			<h2>Salesperson History</h2>
      <div>
								<select
									onChange={handleFilterChange}
									value={filter}
									required
									id="filter"
									className="form-select mb-3"
									name="filter"
								>
									<option value="">Choose a Salesperson</option>
									{salespeople.map((s) => (
										<option key={s.id} value={s.id}>
											{s.first_name} {s.last_name}
										</option>
									))}
								</select>
							</div>
			<table className={"table table-striped"}>
				<thead>
					<tr>
						<th>Salesperson</th>
						<th>Customer</th>
						<th>VIN</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{filteredSales.map((s) => (
						<tr key={s.id}>
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
export default ListSalespersonHistory
