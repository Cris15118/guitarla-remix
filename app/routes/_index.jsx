import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "~/components/listadoGuitarras"
import ListadoPosts from "~/components/listadoPosts"
import { getGuitarras } from "~/models/guitarras.server"
import { getPosts } from "~/models/posts.server"
import stylesGuitarras from "~/styles/guitarras.css"
import stylesBlog from "~/styles/blog.css"
import stylesCurso from "~/styles/curso.css"
import { getCurso } from "~/models/curso.server"
import Curso from "~/components/curso"



export function meta(){


}
export function links(){
  return [
    {rel: 'stylesheet', href: stylesGuitarras},
    {rel: 'stylesheet', href: stylesBlog},
    {rel: 'stylesheet', href: stylesCurso}, 
  ]
   
   
  

}

export async function loader(){
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

    return{
      guitarras: guitarras.data,
      posts: posts.data,
      curso: curso.data
    }
}

function Index() {
  
const { guitarras, posts, curso} = useLoaderData()
  
  return (
    <>
    <main className="contenedor">
    <ListadoGuitarras 
    guitarras={guitarras}
    />
</main>
<section>
  <Curso 
  curso={curso.attributes}
  />

</section>
   

<section className="contenedor">
   <ListadoPosts 
   posts={posts}
   />
</section>

    

    
    </>
  )
}

export default Index