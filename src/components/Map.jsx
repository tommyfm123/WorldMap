import { useNavigate } from "react-router-dom"; // Importa `useNavigate` para navegación programática entre rutas.

// Importa componentes y hooks de react-leaflet para renderizar y controlar el mapa.
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";

// Hooks de React y personalizados.
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext"; // Hook para acceder al contexto de ciudades.
import { useGeolocation } from "../hooks/useGeolocation"; // Hook personalizado para obtener geolocalización.
import { useUrlPosition } from "../hooks/useUrlPosition"; // Hook personalizado para extraer lat/lng de la URL.
import Button from "./Button";

// Componente principal que renderiza el mapa
function Map() {
  const { cities } = useCities(); // Obtiene las ciudades del contexto global.
  const [mapPosition, setMapPosition] = useState([40, 0]); // Posición inicial del mapa.

  // Hook personalizado que da acceso a la geolocalización del usuario.
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition(); // Extrae latitud y longitud de la URL (por ej. ?lat=xx&lng=yy).

  // Cuando cambian los valores de lat/lng en la URL, actualiza la posición del mapa.
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // Si se obtiene la posición por geolocalización, se actualiza el centro del mapa.
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {/* Si aún no hay posición, muestra un botón para obtenerla */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      {/* Contenedor principal del mapa */}
      <MapContainer
        center={mapPosition} // Posición actual del mapa.
        zoom={6} // Nivel de zoom inicial.
        scrollWheelZoom={true} // Permite hacer zoom con la rueda del mouse.
        className={styles.map}
      >
        {/* Capa del mapa base (tiles) usando OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Muestra un marcador por cada ciudad */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]} // Posición del marcador.
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* Centra el mapa cuando cambia la posición */}
        <ChangeCenter position={mapPosition} />

        {/* Detecta clics en el mapa */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Componente auxiliar para cambiar la vista del mapa cuando cambia `position`.
/* eslint-disable react/prop-types */
function ChangeCenter({ position }) {
  const map = useMap(); // Hook que da acceso al mapa de Leaflet.
  map.setView(position); // Cambia la vista del mapa a la nueva posición.
  return null; // No renderiza nada.
}

// Componente que detecta clics en el mapa y redirige a una URL con lat/lng.
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), // Redirecciona con los datos del clic.
  });
}

export default Map;
