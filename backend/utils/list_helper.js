const _ = require('lodash');

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const index = likes.indexOf(Math.max(...likes))
  const {_id, url, __v, ...selectedBlog} = blogs[index]

  return selectedBlog
}

const mostBlogs = (blogs) => {
  const authorBlogCounts = _.countBy(blogs, 'author')
  const authorMostBlogs = _maxBy(_.keys(authorBlogCounts), (author) => authorBlogCounts[author])

  return {
    author: authorMostBlogs,
    blogs: authorBlogCounts[authorMostBlogs]
  }
}

const mostLikes = (blogs) => {
  const authorLikeCounts = _.
  const authorMostLikes = 
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}