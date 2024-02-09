function AlertSuccess({showSuccess, handleSuccessClick, elementType}) {
  return (
    <>
    {showSuccess &&
      <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
      <strong>Success! 🎉</strong> New {elementType} added!
      <button onClick={handleSuccessClick} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      }
      </>
  )
}
export default AlertSuccess
