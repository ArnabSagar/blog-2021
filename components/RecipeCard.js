import Link from 'next/dist/client/link'
import Image from 'next/image'
import React from 'react'

//This component is for each blog post card on the main page

export default function RecipeCard({recipe}) {

    const {title, slug, readingTime, thumbnail, subheading} = recipe.fields //de-structuring the field that we require


    return (
        <div className = 'card'>
        
            <div className="thumbnail">
              
                {/* You always have to whitelist the domain because the Image tag auto-optimises the images from an external domain 
                You add the whitelisted url/domain to the next.config.js file in the root folder 
                Checkout image optimization documentation on Next */}
                <Image  
                    src={'https:' + thumbnail.fields.file.url}
                    width={thumbnail.fields.file.details.image.width} 
                    height={thumbnail.fields.file.details.image.height}     
                />
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
