import { GEOCODE_API_KEY } from "../../../globals";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

interface Response {
  results: Result[];
  status: string;
}

export const GetZipCode = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=true_or_false&key=${GEOCODE_API_KEY}`
  );
  const data: Response = await response.json();
  const zipcode = data.results[0].address_components.find((component) => component.types.includes("postal_code"));
  return zipcode?.long_name || "";
};
