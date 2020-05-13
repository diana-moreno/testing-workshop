import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor'
import * as utilsMock from '../../utils/api'

// If you make a call to jest.mock in the root of your module, that mocking will take place before any require statements are resolved/run.

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  // create a fake user, post, history, and api
  // use ReactDOM.render() to render the editor to a div
  // fill out form elements with your fake post

  const container = document.createElement('div')
  const fakeUser = {id: 'foobar'}
  const fakeHistory = {
    push: jest.fn(),
  }

  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)

  const form = container.querySelector('form')
  const {title, content, tags} = form.elements

  title.value = 'I like pinneapple'
  content.value = 'Like a lot... Sorta'
  tags.value = 'pinneapple,    my    ,likes'

  // Act
  // submit form
  // wait for promise to settle

  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  await flushPromises()

  // Assert
  // ensure the create function was called with the right data
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')

  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1)
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['pinneapple', 'my', 'likes'],
    date: expect.any(String),
  })
})

// TODO later...
test('snapshot', () => {})
