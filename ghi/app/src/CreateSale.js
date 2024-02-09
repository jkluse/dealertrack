import { useState, useEffect } from "react";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";

function CreateSale() {
	const [vins, setVins] = useState([]);
	const [salespeople, setSalespeople] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [vin, setVin] = useState("");
	const [salesperson, setSalesperson] = useState("");
	const [customer, setCustomer] = useState("");
	const [price, setPrice] = useState("");

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	async function fetchAutomobiles() {
		const res = await fetch("http://localhost:8100/api/automobiles/");
		if (res.ok) {
			const data = await res.json();
			const value = data.autos.filter(auto=> auto.sold === false)
			setVins(value);
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

	async function fetchCustomers() {
		const res = await fetch("http://localhost:8090/api/customers/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setCustomers(data.customers);
		}
	}

	useEffect(() => {
		fetchAutomobiles();
		fetchSalesPeople();
		fetchCustomers();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			automobile: vin,
			salesperson,
			customer,
			price,
		};

		const locationUrl = "http://localhost:8090/api/sales/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {

			const locationUrlInventory = `http://localhost:8100/api/automobiles/${vin}/`
			const fetchConfigInventory = {
				method: "put",
				body: JSON.stringify({sold: true}),
				headers: {
					"Content-Type": "application/json",
				},
			};

			const response = await fetch(locationUrlInventory, fetchConfigInventory);
			if (response.ok) {
				fetchAutomobiles();
				setShowSuccess(true);
				setVin("");
				setSalesperson("");
				setCustomer("");
				setPrice("");

				setTimeout(() => {
					setShowSuccess(false);
				}, 2000);
			}
		} else {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 2000);
			let message = await response.json();
			console.log(message);
		}
	}

	function handleCustomerChange(e) {
		setCustomer(e.target.value);
	}
	function handlePriceChange(e) {
		setPrice(e.target.value);
	}
	function handleVinChange(e) {
		setVin(e.target.value);
	}
	function handleSalespersonChange(e) {
		setSalesperson(e.target.value);
	}

	function handleSuccessClick() {
		setShowSuccess(false);
	}
	function handleErrorClick() {
		setShowError(false);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Record a new sale</h1>
						<form onSubmit={handleSubmit}>
							<div>
								<select
									onChange={handleVinChange}
									value={vin}
									required
									id="vin"
									className="form-select mb-3"
									name="vin"
								>
									<option value="">Choose a VIN</option>
									{vins.map((auto) => (
										<option key={auto.id} value={auto.vin}>
											{auto.vin}
										</option>
									))}
								</select>
							</div>
							<div>
								<select
									onChange={handleSalespersonChange}
									value={salesperson}
									required
									id="salesperson"
									className="form-select mb-3"
									name="salesperson"
								>
									<option value="">Choose a Salesperson</option>
									{salespeople.map((s) => (
										<option key={s.id} value={s.id}>
											{s.first_name} {s.last_name}
										</option>
									))}
								</select>
							</div>
							<div>
								<select
									onChange={handleCustomerChange}
									value={customer}
									required
									id="customer"
									className="form-select mb-3"
									name="customer"
								>
									<option value="">Choose a Customer</option>
									{customers.map((c) => (
										<option key={c.id} value={c.id}>
											{c.first_name} {c.last_name}
										</option>
									))}
								</select>
							</div>

							<div className="form-floating mb-3">
								<input
									onChange={handlePriceChange}
									value={price}
									placeholder="price"
									required
									type="text"
									id="price"
									className="form-control"
									name="price"
								/>
								<label htmlFor="price">Price</label>
							</div>
							<button className="btn btn-primary">Create</button>
							<AlertSuccess
								showSuccess={showSuccess}
								handleSuccessClick={handleSuccessClick}
								elementType="Sale"
							/>
							<AlertError
								showError={showError}
								handleSuccessClick={handleErrorClick}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CreateSale;
