import { useEffect, useState } from "react";

function CreateModel() {
  const [name, setName] = useState('')
  const [pictureURL, setPictureURL] = useState('')
  const [manufacturers, setManufacturers] = useState([])
  const [manufacturer, setManufacturer] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)


  async function fetchManufacturers() {
		const res = await fetch("http://localhost:8100/api/manufacturers/");
		if (res.ok) {
			const data = await res.json();
      // console.log(data)
			setManufacturers(data.manufacturers);
		}
	}

	useEffect(() => {
		fetchManufacturers();
	}, []);

  async function handleSubmit(e){
    e.preventDefault()
    const data = {
      name,
      picture_url: pictureURL,
      manufacturer_id: manufacturer
    };


    const locationUrl = "http://localhost:8100/api/models/";
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
      setManufacturer('')
      setPictureURL('')
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

  function handlePictureURLChange(e){
    setPictureURL(e.target.value)
  }
  function handleManufacturerChange(e){
    setManufacturer(e.target.value)
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
            <h1>Create a Vehicle Model</h1>
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
              <div className="form-floating mb-3">
                <input
                  onChange={handlePictureURLChange} value={pictureURL}
                  placeholder="Style"
                  required
                  type="text"
                  id="style"
                  className="form-control"
                  name="pictureURL"
                />
                <label htmlFor="pictureURL">Picture URL</label>
              </div>
              <div >
              <select
									onChange={handleManufacturerChange}
									value={manufacturer}
									required
									id="manufacturer"
									className="form-select mb-3"
									name="manufacturer"
								>
									<option value="">Choose a Manufacturer</option>
									{manufacturers.map((m) => (
										<option key={m.id} value={m.id}>
											{m.name}
										</option>
									))}
                  </select>
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
  export default CreateModel
