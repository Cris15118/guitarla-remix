import imagen from "../../public/img/nosotros.jpg";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/nosotros.css";


export function meta() {
  return [
    { title: "Guitarla-sobre nosotros" },
    { name: "description", content: "venta de guitarras" },
  ];
}
export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {rel: 'preload', href: imagen, as:'image'}
  ];
}

function Nosotros() {
  
  return (
    <ClientOnly>
      {()=>(
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            incidunt temporibus ratione dolores culpa vitae. Magnam, tempora non
            facilis praesentium error eius, sapiente nostrum vero libero
            mollitia soluta quisquam ex.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            incidunt temporibus ratione dolores culpa vitae. Magnam, tempora non
            facilis praesentium error eius, sapiente nostrum vero libero
            mollitia soluta quisquam ex.
          </p>
        </div>
      </div>
    </main>
    )}
    </ClientOnly>
  );
}

export default Nosotros;
