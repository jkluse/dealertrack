import { useEffect, useState } from "react";

function CreateManufacturer() {
  const [name, setName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()

    const data = {
			name
		};


		const locationUrl = "http://localhost:8100/api/manufacturers/";
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
      setName('')
      setTimeout(()=>{
        setShowSuccess(false)
      }, 2000)
		} else {
      setShowError(true)
      setTimeout(()=>{
        setShowError(false)
      }, 2000)
			let message = await response.json();
			console.log(message);
		}
  }

  function handleNameChange(e){
    setName(e.target.value)
  }

  function handleSuccessClick(){
    setShowSuccess(false)
  }
  function handleErrorClick(){
    setShowError(false)
  }

  return (
    <div className="container">

			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Add a Manufacturer</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-3">
								<input
                  onChange={handleNameChange} value={name}
									placeholder="Style"
									required
									type="text"
									id="style"
									className="form-control"
									name="name"
								/>
								<label htmlFor="name">Name</label>
							</div>
							<button className="btn btn-primary" >Create</button>
              {showSuccess &&
      <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
      <strong>Success!</strong> New Manufacturer added!
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
  )
}
export default CreateManufacturer
