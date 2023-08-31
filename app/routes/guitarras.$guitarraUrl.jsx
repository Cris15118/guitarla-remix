import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server";
import { Link } from "@remix-run/react";
import { useState } from "react";

export function meta({ data }) {
  if (!data) {
    return [
      { title: "Guitarla- Guitarra no encontrada}" },
      {
        name: "description",
        content: "Guitarras, venta de guitarras, guitarra no encontrada",
      },
    ];
  }
  return [
    { title: `Guitarla- ${data.data[0].attributes.nombre}` },
    {
      name: "description",
      content: `venta de guitarras, guitarra ${data.data[0].attributes.nombre}`,
    },
  ];
}

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  // si no se encuentra la guitarra lanzamos un error

  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra No Encotrada",
    });
  }

  return guitarra;
}

function Guitarras() {

const {agregarCarrito} = useOutletContext()

  const [cantidad, setCantidad]= useState(0)
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  
const handleSubmit = e =>{
  e.preventDefault()
  if(cantidad <1){
    alert('Debes seleccionar una cantidad')
    return
  }
  const guitarraSeleccionada ={
    id: guitarra.data[0].id,
    imagen: imagen.data.attributes.url,
    nombre,
    precio,
    cantidad
  }
  agregarCarrito(guitarraSeleccionada)

}


  return (
    <div className="guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`imagen de la guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre} </h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">{precio} € </p>

          <form onSubmit={handleSubmit} className="formulario">
            <label htmlFor="cantidad">Cantidad</label>
            <select
             onChange={e => setCantidad(parseInt(e.target.value))}
              id="cantidad"
              >
              <option value="0">-- Seleccione --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit"
            value= "Agregar al carrito"/>

          </form>

      </div>
      <Link className="enlace-atras" to={"/guitarras"}>
        Atras
      </Link>
    </div>
  );
}

export default Guitarras;
