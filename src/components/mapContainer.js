import React from "react"
import { Helmet } from "react-helmet"

const MapContainer = ({ children }) => {
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_MAP_API}&libraries=places,geometry,marker`} // Add necessary libraries like 'marker'
          async
          defer
        ></script>
      </Helmet>
      {children}
    </>
  )
}

export default MapContainer
