import Link from 'next/dist/client/link'
import React from 'react'


export default function RecipeCard({recipe}) {

    const {title, slug, readingTime, thumbnail, subheading} = recipe.fields //de-structuring the field that we require


    return (
        <div className = 'card'>
        
            <div className="thumbnail">
                {/* image - thumbnail */}
            </div>

            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>{readingTime} mins read</p>
                    <h6>{subheading}</h6>
                </div>

                <div className = "actions">
                    <Link href={'/recipes/' + slug}><a>Read</a></Link>
                </div>

            </div>

        </div>

    )
}
