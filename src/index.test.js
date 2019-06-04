import 'react'
import useHolochainWebClient from './index'
import React from 'react'
require('@holochain/hc-web-client')
import { render } from 'react-testing-library'


describe('useHolochainWebClient', () => {
  const TestComponent = () => {  
    console.log('1')
    useHolochainWebClient(' once ')
    console.log('2')
    const { callZomeRef, callRef, closeRef } = useHolochainWebClient(' twice ')

    console.log('3')
    console.log('callZomeRef', callZomeRef.current)
    console.log('callRef', callRef.current)  
    console.log('closeRef', closeRef.current)    
  
    console.log('callZomeRef()', callZomeRef.current())
    console.log('callRef()', callRef.current())  
    console.log('closeRef()', closeRef.current())      
    return <div />
  }

  it('imports the file', () => {  
    render(<TestComponent />)
    expect('got there').toMatchSnapshot()
  })
})

