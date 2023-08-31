import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";

import ListadoGuitarras from "~/components/listadoGuitarras";

export function meta() {
  return [
    { title: "Guitarla- Tienda de guitarras" },
    { name: "description", content: "Nuestra collecion de guitarras" },
  ];
}

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return <ListadoGuitarras guitarras={guitarras} />;
}

export default Tienda;
