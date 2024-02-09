import { useEffect, useState } from "react";


function ScheduleService() {
	const [formData, setFormData] = useState({
		vin: '',
		customer: '',
		date: '',
		time: '',
		technician: '',
		reason: ''
	})
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);
	const [technicians, setTechnicians] = useState([]);


	async function fetchTechs() {
		const res = await fetch("http://localhost:8080/api/technicians/");
		if (res.ok) {
			const data = await res.json();
			// console.log(data);
			setTechnicians(data.technicians);
		}
	}

	useEffect(() => {
		fetchTechs();
	}, []);

	function handleSuccessClick() {
		setShowSuccess(false);
	}
	function handleErrorClick() {
		setShowError(false);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			vin: formData.vin,
			customer: formData.customer,
			date_time: `${formData.date} ${formData.time}`,
			technician: formData.technician,
			reason: formData.reason
		};


		const locationUrl = "http://localhost:8080/api/appointments/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);
		if (response.ok) {
      setShowSuccess(true)
			setFormData({
				vin: '',
				customer: '',
				date: '',
				time: '',
				technician: '',
				reason: ''
			})

			setTimeout(() => {
				setShowSuccess(false);
			}, 2000);

		} else {
      setShowError(true)
      setTimeout(()=>{
        setShowError(false)
      },3000)
			let message = await response.json();
			console.log(message);
		}
	}

	function handleVINChange(e){
		setFormData((prevData)=> (
			{...prevData, vin: e.target.value}
		))
	}
	function handleCustomerChange(e){
		setFormData((prevData)=> (
			{...prevData, customer: e.target.value}
		))
	}
	function handleDateChange(e){
		setFormData((prevData)=> (
			{...prevData, date: e.target.value}
		))
	}
	function handleTimeChange(e){
		setFormData((prevData)=> (
			{...prevData, time: e.target.value}
		))
	}
	function handleTechnicianChange(e){
		setFormData((prevData)=> (
			{...prevData, technician: e.target.value}
		))
	}
	function handleReasonChange(e){
		setFormData((prevData)=> (
			{...prevData, reason: e.target.value}
		))
	}

	return (
		<div className="container">
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Create a Service Appointment 🔧</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									onChange={handleVINChange}
									value={formData.vin}
									placeholder="vin"
									required
									type="text"
									id="vin"
									className="form-control"
									name="vin"
								/>
								<label htmlFor="vin">Automobile VIN</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleCustomerChange}
									value={formData.customer}
									placeholder="customer"
									required
									type="text"
									id="customer"
									className="form-control"
									name="customer"
								/>
								<label htmlFor="customer">Customer</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleDateChange}
									value={formData.date}
									placeholder="date"
									required
									type="date"
									id="date"
									className="form-control"
									name="date"
								/>
								<label htmlFor="date">Date</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleTimeChange}
									value={formData.time}
									placeholder="time"
									required
									type="time"
									id="time"
									className="form-control"
									name="time"
								/>
								<label htmlFor="time">Time</label>
							</div>
							<div className="mb-3">
								<select
									onChange={handleTechnicianChange}
									value={formData.technician}
									required
									id="technician"
									className="form-select"
									name="technician"
								>
									<option value="">Choose a Technician</option>
									{technicians.map((tech) => (
										<option key={tech.id} value={tech.id}>
											{tech.first_name} {tech.last_name}
										</option>
									))}
								</select>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleReasonChange}
									value={formData.reason}
									placeholder="reason"
									required
									type="text"
									id="reason"
									className="form-control"
									name="reason"
								/>
								<label htmlFor="reason">Reason</label>
							</div>

							<button className="btn btn-primary">Create</button>

							{showSuccess && (
								<div
									className="alert alert-success alert-dismissible fade show mt-2"
									role="alert"
								>
									<strong>Success!</strong> Service Appointment Scheduled!
									<button
										onClick={handleSuccessClick}
										type="button"
										className="btn-close"
										data-bs-dismiss="alert"
										aria-label="Close"
									></button>
								</div>
							)}
							{showError && (
								<div
									className="alert alert-warning alert-dismissible fade show mt-2"
									role="alert"
								>
									<strong>💥 Ooops, something went wrong!</strong> Please try
									again or contact your administrator.
									<button
										onClick={handleErrorClick}
										type="button"
										className="btn-close"
										data-bs-dismiss="alert"
										aria-label="Close"
									></button>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ScheduleService;
