import 'react'
import useHolochainWebClient from './index'
import { shallow } from 'enzyme';
import React from 'react'

function TestComponent () {
  const { callZomeRef, callRef, closeRef } = useHolochainWebClient('ds;akdls')
  callZomeRef.current()
  callRef.current()
  closeRef.current()
  return <div />
}

it('imports the file', () => {  
  const wrapper = shallow(<TestComponent />)
  expect(wrapper).toMatchSnapshot()
})