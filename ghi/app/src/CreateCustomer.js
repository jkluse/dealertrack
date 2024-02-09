import { useState, useEffect } from "react";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";

function CreateCustomer() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			first_name: firstName,
			last_name: lastName,
      address,
      phone_number: phone
		};

		const locationUrl = "http://localhost:8090/api/customers/";
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
			setFirstName("");
			setLastName("");
      setAddress('')
      setPhone('')
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

	function handleFirstNameChange(e) {
		setFirstName(e.target.value);
	}
	function handleLastNameChange(e) {
		setLastName(e.target.value);
	}
	function handleAddressChange(e) {
		setAddress(e.target.value);
	}
	function handlePhoneChange(e) {
		setPhone(e.target.value);
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
						<h1>Add a Customer</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									onChange={handleFirstNameChange}
									value={firstName}
									placeholder="firstName"
									required
									type="text"
									id="firstName"
									className="form-control"
									name="firstName"
								/>
								<label htmlFor="firstName">First Name</label>
							</div>
              
							<div className="form-floating mb-3">
								<input
									onChange={handleLastNameChange}
									value={lastName}
									placeholder="lastName"
									required
									type="text"
									id="lastName"
									className="form-control"
									name="lastName"
								/>
								<label htmlFor="lastName">Last Name</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleAddressChange}
									value={address}
									placeholder="address"
									required
									type="text"
									id="address"
									className="form-control"
									name="address"
								/>
								<label htmlFor="address">Address</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handlePhoneChange}
									value={phone}
									placeholder="phone"
									required
									type="text"
									id="phone"
									className="form-control"
									name="phone"
								/>
								<label htmlFor="phone">Phone number</label>
							</div>
							<button className="btn btn-primary">Create</button>
							<AlertSuccess
								showSuccess={showSuccess}
								handleSuccessClick={handleSuccessClick}
								elementType="Customer"
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
export default CreateCustomer;
