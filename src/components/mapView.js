import React, { useEffect, useRef } from "react"
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"
import * as styles from "./mapView.module.css"
import { ClusteredWorkMarkers } from "./clusteredWorkMarkers"

const MapView = ({ locations }) => {
  return (
    <APIProvider apiKey={process.env.GATSBY_MAP_API}>
      <div className={styles.mapContainer}>
        <Map
          defaultZoom={4}
          defaultCenter={{ lat: 40.7128, lng: -74.006 }}
          mapId="1351f3b8991e5284d2cb50ba"
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          <ClusteredWorkMarkers projects={locations} />
        </Map>
      </div>
    </APIProvider>
  )
}

export default MapView
