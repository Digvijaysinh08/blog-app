import React from 'react'
import { Link } from 'react-router-dom'

const LatestBlogs = ({heading, newClass, blogs}) => {

  return (
    <section className={ newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"}>
      <h3>{heading}</h3>
      <div class="container">
        {
          blogs && blogs.map((element) => {
            return (
              <Link to={`/blog/${element._id}`} className="card" key={element._id}>
                <img src={element.mainImage.url} alt={element.title} />
                <span className='category'>{element.category}</span>
                <h4>{element.title}</h4>
                <div class="writer_section">
                  <div class="author">
                    <img src={element.authorAvatar} alt="author_avatar"/>
                    <p>{element.authorName}</p>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}

export default LatestBlogs
