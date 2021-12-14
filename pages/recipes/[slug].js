import { createClient } from "contentful"
import Image from 'next/image'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Skeleton from "../../components/Skeleton"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONENTFUL_ACCESS_KEY,
})


//The following function runs during build time 
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'blogPost'        //this is again, the ID of the content type that I decided on contentful
                                    //this gets stored on the .tems property of the res object
  })  

  const paths = res.items.map( item => {
    return {
      params: {
        slug: item.fields.slug 
      }
    }
  })
  // console.log(paths);

  return{
    //array of different path objects for each blogPost obj/item  
    //then each obj has a param property (for route params for that path obj), which is itself an obj
    //And there is only one route param for each path, which is the slug property

    // paths: [{ params:{slug: }},{}]
    paths: paths, //the paths variable assigned to the return paths variable is from the function above
  
    fallback: false  //false, this means that we will show a 404 page and not a fallback page
                      //true, this means that 404 page of the recipe page didn't return, but rather a fallback version 
                                
  }

}

//For each one of the different paths generated above, the following function will run (i.e. the number of blog posts)
//Each time it runs, it passes in a context object. and on that context object, there is a params property
//which would have the slug... the context obj here would be that specific blog post's object, and hence the its specific params 
export async function getStaticProps({params}){ //this is the params obj from the above function that we are destucturing here
  // res.items is returned as an array, even though there will be one blogpost,
  // but technicallly the slug could not have been unique...which is not the case here. so we are destructuring the items
  const {items} = await client.getEntries({ 
    content_type: 'blogPost', //this is the content type ID we have for blogPosts on contentful
    'fields.slug': params.slug  //we are specifying to contentful that we want from a specific object. and we know that a slug is unique
  }) 

  if(!items.length){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props:{ recipe: items[0]},
    revalidate: 1  //how often (in seconds) does next.js check for content updates and regenerates the content on the page, only for preexisting pages
  }

}



export default function RecipeDetails({recipe}) {  //destructing the props obj object from the func above to get the recipe
  // console.log(recipe);

  if(!recipe) return (
    <Skeleton/>
  )

  const {featuredImage, title, readingTime, mainText} = recipe.fields
  return (
    <div>
      <div className="banner">
        <Image 
          src={'https:' + featuredImage.fields.file.url}
          width = {featuredImage.fields.file.details.image.width}
          height = {featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>      
       
      <div className="info">
        <p>Reading time: {readingTime} mins</p>
      </div>

      {/* The main text cannot be just a straight output. It is Rich text so we have to destructure/parse it*/}
      <div className="mainText"> 
        <div>{documentToReactComponents(mainText)}</div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>

    </div>
  )
}