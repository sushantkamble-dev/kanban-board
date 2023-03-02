import React from 'react'
import Routes from "./routes/index";
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <React.Fragment>
      <Routes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  )
}

export default App;
