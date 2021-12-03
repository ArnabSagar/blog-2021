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

                {/* Also, Images in Next which use src must have their height and width defined */}
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
                    {/* We need to import the Link component from Next to use any links*/}
                    <Link href={'/recipes/' + slug}><a>Read</a></Link>
                </div>
            </div>

            <style jsx>{`
                .card {
                transform: rotateZ(-1deg);
                }
                .content {
                background: #fff;
                box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                margin: 0;
                position: relative;
                top: -40px;
                left: -10px;
                }
                .info {
                padding: 16px;
                }
                .info h4 {
                margin: 4px 0;
                text-transform: uppercase;
                }
                .info p {
                margin: 0;
                color: #777;
                }
                .actions {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
                }
                .actions a {
                color: #fff;
                background: #f01b29;
                padding: 16px 24px;
                text-decoration: none;
                }
            `}</style>

        </div>

    )
}
