function AlertError({showError, handleErrorClick}) {
  return (
    <>
    {showError &&
      <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
      <strong>💥 Ooops, something went wrong!</strong> Please try again or contact your administrator.
      <button onClick={handleErrorClick} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      }
    </>
  )
}
export default AlertError
