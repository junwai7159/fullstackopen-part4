const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initial } = require('lodash')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "HTMLdf is easy",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
]

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifying field is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const initialResponse = await api.get('/api/blogs')

  const newBlog = {
    title: "Full Stack",
    author: "John Doe",
    url: "https://full-stack.com",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialResponse.body.length + 1)
})

test('if blog is added with no likes, zero will be assumed', async () => {
  const newBlog = {
    title: "Full Stack",
    author: "John Doe",
    url: "https://full-stack.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  expect(response.body.likes).toBeDefined()
})

test('if blog is added with no url or title it will not be added', async () => {
  const newBlog = {
    author: "John Doe",
    url: "https://full-stack.com",
    likes: 1
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  expect(response.status).toBe(400)
})

test('a blog may be removed by issuing http delete request', async () => {
  const newBlog = {
    title: "Full Stack",
    author: "StackMaster",
    url: "https://stack.com/",
    likes: 1
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
  
  const response = await api.get(`/api/blogs/${result.body.id}`)
  const deleteBlog = await api
    .delete('/api/blogs/${result.body.id}')
  
  expect(deleteBlog.status).toBe(204)
})

test('a blog may be edited by issuing http put request', async () => {
  const newBlog = {
    title: "Full Stack",
    author: "StackMaster",
    url: "https://stack.com/",
    likes: 1
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
  
  newBlog.likes += 1

  await api
    .put(`/api/blogs/${result.body.id}`)
    .send(newBlog)
  
  const newResult = await api.get(`/api/blogs/${result.body.id}`)

  expect(newResult.body.likes).toBe(newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})