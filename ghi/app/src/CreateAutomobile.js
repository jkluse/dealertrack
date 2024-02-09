import { useEffect, useState } from "react";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

function CreateAutomobile() {
	const [models, setModels] = useState([]);
	const [vin, setVin] = useState("");
	const [color, setColor] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

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

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			color,
			year,
			vin,
			model_id: model,
		};

		console.log(data);
		const locationUrl = "http://localhost:8100/api/automobiles/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
			setShowSuccess(true);
			setVin("");
			setYear("");
			setColor("");
			setModel("");
			setTimeout(() => {
				setShowSuccess(false);
			}, 2000);
		} else {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 2000);
			let message = await response.json();
			console.log(message);
		}
	}
	function handleVINChange(e) {
		setVin(e.target.value);
	}
	function handleYearChange(e) {
		setYear(e.target.value);
	}
	function handleColorChange(e) {
		setColor(e.target.value);
	}
	function handleModelChange(e) {
		setModel(e.target.value);
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
						<h1>Add an Automobile to Inventory</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									onChange={handleVINChange}
									value={vin}
									placeholder="vin"
									required
									type="text"
									id="vin"
									className="form-control"
									name="vin"
								/>
								<label htmlFor="name">VIN</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleYearChange}
									value={year}
									placeholder="year"
									required
									type="text"
									id="year"
									className="form-control"
									name="year"
								/>
								<label htmlFor="year">Year</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleColorChange}
									placeholder="color"
									required
									type="text"
									id="color"
									className="form-control"
									name="color"
								/>
								<label htmlFor="color">Color</label>
							</div>
							<div>
								<select
									onChange={handleVINChange}
									value={vin}
									required
									id="manufacturer"
									className="form-select mb-3"
									name="manufacturer"
								>
									<option value="">Choose a Model</option>
									{models.map((m) => (
										<option key={m.id} value={m.id}>
											{m.name}
										</option>
									))}
								</select>
							</div>
							<button className="btn btn-primary">Create</button>
							<AlertSuccess
								showSuccess={showSuccess}
								handleSuccessClick={handleSuccessClick}
								elementType="Automobile"
							/>
							<AlertError
								showError={showError}
								handleErrorClick={handleErrorClick}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CreateAutomobile;
