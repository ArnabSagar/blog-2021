import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">

      {/* In the header add the Arnab Sagar blog logo + other details that always load with every blog */}
      <header> 
        <Link href="/">
          <a>
            <h1>
              <span>Arnab Sagar</span>
              <span>Blog </span>
            </h1>
          </a>
        </Link>
      </header>

      {/* Add some sort of transition/animation when clicking a Blog post (in the future) */}
      <div className="page-content">
        { children }
      </div>

      {/* In the footer add the good old details. Keep it simple*/}
      <footer>
        <p>Copyright 2021 @ Arnab Sagar :)</p>
      </footer>

    </div>
  )
}