import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
import One  from './one'

it('1', () => {
  const a= shallow(<One />)
  console.log(a.find('.test'))
  expect(6).toBe(6)
})