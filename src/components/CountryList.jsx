import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities(); // Obtiene del contexto las ciudades cargadas y el estado de carga.

  if (isLoading) return <Spinner />; // Si los datos aún están cargando, muestra el Spinner.

  if (!cities.length)
    // Si no hay ciudades cargadas, muestra un mensaje para que el usuario agregue una.
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    // Genera una lista única de países a partir de las ciudades, evitando duplicados.

    if (!arr.map((el) => el.country).includes(city.country))
      // Si el país de la ciudad aún no está en la lista, lo agrega con su emoji.
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr; // Si ya está, no lo agrega.
  }, []);

  // Renderiza la lista de países usando el componente CountryItem.
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
