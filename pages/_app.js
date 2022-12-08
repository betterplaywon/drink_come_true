import '../styles/globals.css'
import PropTypes from 'prop-types'
// import "antd/dist/antd.min.css"

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

App.prototypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App
