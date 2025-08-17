import React, { useState } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import * as styles from "./mapView.module.css"
import { ClusteredWorkMarkers } from "./clusteredWorkMarkers"

const MapView = ({ locations }) => {
  const [clickedMarker, setClickedMarker] = useState()
  const [showClusterInfo, setShowClusterInfo] = useState([])

  const handleClusterClick = (event, cluster, map) => {
    const clusterProjects = cluster.markers.map(marker => marker.innerText)
    const filteredProjects = locations.filter(
      item => clusterProjects.indexOf(item.id) !== -1
    )
    setShowClusterInfo(filteredProjects)
    setClickedMarker(null)
  }

  return (
    <APIProvider apiKey={process.env.GATSBY_MAP_API}>
      <div className={styles.mapContainer}>
        <Map
          defaultZoom={4}
          defaultCenter={{ lat: 40.7128, lng: -74.006 }}
          mapId="1351f3b8991e5284d2cb50ba"
          options={{ streetViewControl: false, mapTypeControl: false }}
          onClick={() => {
            setClickedMarker(null)
            setShowClusterInfo([])
          }}
        >
          <ClusteredWorkMarkers
            projects={locations}
            clickedMarker={clickedMarker}
            setClickedMarker={setClickedMarker}
            showClusterInfo={showClusterInfo}
            setShowClusterInfo={setShowClusterInfo}
            handleClusterClick={handleClusterClick}
          />
        </Map>
      </div>
    </APIProvider>
  )
}

export default MapView
