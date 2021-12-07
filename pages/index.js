import { createClient } from "contentful"
import { NextServer } from "next/dist/server/next";
import RecipeCard from "../components/RecipeCard";

// FALLBACK PAGES??



// INCREMENTAL STATIC REGENERATION (ISR) - Next.js has this functionality
//Next.js generates new pages and regenerates current pages on the fly when data is updated.

// For making changes to a blgopost or adding new blogposts to the website,
//  I will either have to rebuild the whole website by repushing to github or use ISR
// This is because all the blod cards and the slug pages are all static 


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
    props: {recipes: res.items},
    revalidate: 1 //how often (in seconds) does next.js check for content updates and regenerates the content on the page
  
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