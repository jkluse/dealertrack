import { useEffect, useState } from "react";

function CreateTechnician() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [employeeID, setEmployeeID] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

	function handleFirstNameChange(e) {
		setFirstName(e.target.value);
	}
	function handleLastNameChange(e) {
		setLastName(e.target.value);
	}
	function handleEmployeeIDChange(e) {
		setEmployeeID(e.target.value);
	}

  function handleSuccessClick(){
    setShowSuccess(false)
  }
  function handleErrorClick(){
    setShowError(false)
  }

	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			first_name: firstName,
			last_name: lastName,
			employee_id: employeeID,
		};

		const locationUrl = "http://localhost:8080/api/technicians/";
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
			setFirstName("");
			setLastName("");
			setEmployeeID("");
      setTimeout(()=>{
        setShowSuccess(false)
      },2000)
		} else {
      setShowError(true)
      setTimeout(()=>{
        setShowError(false)
      },2000)
			let message = await response.json();
			console.log(message);
		}
	}

	return (
		<div className="container">

			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Add a Technician</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
									onChange={handleFirstNameChange}
									value={firstName}
									placeholder="Style"
									required
									type="text"
									id="style"
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
									onChange={handleEmployeeIDChange}
									value={employeeID}
									placeholder="employeeID"
									required
									type="text"
									id="employeeID"
									className="form-control"
									name="employeeID"
								/>
								<label htmlFor="employeeID">Employee Id</label>
							</div>

							<button className="btn btn-primary">Create</button>

              {showSuccess &&
      <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
      <strong>Success!</strong> New technician added!
      <button onClick={handleSuccessClick} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      }
      {showError &&
      <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
      <strong>💥 Ooops, something went wrong!</strong> Please try again or contact your administrator.
      <button onClick={handleErrorClick} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      }
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CreateTechnician;
