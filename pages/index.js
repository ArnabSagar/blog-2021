import { createClient } from "contentful"
import RecipeCard from "../components/RecipeCard";

// FALLBACK PAGES??
// INCREMENTAL STATIC REGENERATION


/* The following is a async function which we use to get data 
  from any source and then inject the data as Props in our components
  This is where we first make our connection to Contentful*/

export async function getStaticProps(){

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'blogPost' }) //this is the content type ID we have for blogPosts on contentful

  return {
    props: {
      recipes: res.items
    }
  }

}

export default function Recipes({recipes}) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key = {recipe.sys.id} recipe={recipe}/>
      ))}

        {/* styled jsx like the one that follows only applies to this specific component */}
    <style jsx>{`     
      .recipe-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px 60px;
      } 
      
    `}</style>

    </div>
  ) 
}