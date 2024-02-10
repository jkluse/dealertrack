import logo from './dealerTrackLogo_green.svg'

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img src={logo} alt="dealerTRACK logo img-fluid" style={{ height: "30vh" }}/>
      <p></p>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
    </div>
  );
}

export default MainPage;
