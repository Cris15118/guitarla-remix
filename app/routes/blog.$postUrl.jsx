import { Link, useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

export function meta({ data }) {
  if (!data) {
    return [
      { title: "Guitarla- Post no encontrado}" },
      {
        name: "description",
        content: "Guitarras, venta de guitarras, guitarra no encontrada",
      },
    ];
  }
  return [
    { title: `Guitarla- ${data.data[0].attributes.titulo}` },
    {
      name: "description",
      content: `Blog sobre guitarras, post ${data.data[0].attributes.titulo}`,
    },
  ];
}

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);

  // control de errores si no se encuntra un post

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Post No Encotrado",
    });
  }

  return post;
}

function Post() {
  const post = useLoaderData();
  const { contenido, imagen, titulo, publishedAt } = post.data[0].attributes;

  return (
    <article className="contenedor post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`imagen del post ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha"> {formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
      <Link className="enlace-atras" to={"/blog"}>
        Atras
      </Link>
    </article>
  );
}

export default Post;
