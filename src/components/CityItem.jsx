import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";

// Función que formatea una fecha en formato "día mes año" en inglés
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// Componente funcional que representa una ciudad individual en una lista
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities(); // Obtiene del contexto la ciudad actualmente seleccionada y la función para eliminar una ciudad
  const { cityName, emoji, date, id, position } = city; // Desestructura los datos de la ciudad que recibe como prop

  // Manejador del botón de eliminación; evita la navegación y elimina la ciudad
  function handleClick(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del botón dentro del <Link>
    deleteCity(id); // Llama a la función para eliminar la ciudad usando su ID
  }

  // Retorna un elemento de lista con un enlace que lleva al detalle de la ciudad
  return (
    <li>
      <Link
        // Aplica una clase base y, si esta ciudad es la seleccionada, también una clase para marcarla como activa
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        // Construye la URL destino con query params para latitud y longitud
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Emoji que representa visualmente la ciudad */}
        <span className={styles.emoji}>{emoji}</span>

        {/* Nombre de la ciudad */}
        <h3 className={styles.name}>{cityName}</h3>

        {/* Fecha en que se agregó la ciudad, formateada */}
        <time className={styles.date}>({formatDate(date)})</time>

        {/* Botón para eliminar la ciudad */}
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times; {/* Símbolo de "cerrar" o "eliminar" */}
        </button>
      </Link>
    </li>
  );
}

// Validación de las props del componente para asegurar que recibe una ciudad con estructura correcta
CityItem.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired, // Nombre de la ciudad (obligatorio)
    emoji: PropTypes.string.isRequired, // Emoji representativo de la ciudad
    date: PropTypes.string.isRequired, // Fecha como string
    id: PropTypes.string.isRequired, // ID único de la ciudad
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired, // Latitud numérica
      lng: PropTypes.number.isRequired, // Longitud numérica
    }).isRequired,
  }).isRequired,
};

// Exporta el componente para poder usarlo en otros archivos
export default CityItem;
