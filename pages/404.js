import Link from "next/link";
import { useEffect } from "react";      //fires a function when a component first renders
import { useRouter } from "next/router";

export default function NotFound() {

    const router = useRouter();

    useEffect(() => {
        
        
        setTimeout(() => {  //redirects the user after a certain aomunt of time, here time is the second argument for time in ms
            
            router.push('/')
            
        }, 4000); //Represents the timeout in ms, so 4 secs

    }, []) //second argument is empty array which is the dependency array...so the function only fires once the component renders


    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page can't be found</h2>
            <p>Redirecting to <Link href='/'>Homepage</Link></p>
        
            <style jsx>{`
                .not-found {
                background: #fff;
                padding: 30px;
                box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                transform: rotateZ(-1deg);
                }
                h1 {
                font-size: 3em;
                }
            `}</style>
        
        </div> 

    )
}
