import 'react'
import useHolochainWebClient from './index'
import React from 'react'
import { render } from '@testing-library/react'
import { callZome, call, close } from '../__mocks__/@holochain/hc-web-client'

describe('useHolochainWebClient', () => {
  const TestComponent = () => {  
    const { callZomeRef, callRef, closeRef } = useHolochainWebClient()
  
    callZomeRef.current('callZomeArg')
    callRef.current('callArg')
    closeRef.current('closeArg')

    return null
  }

  it('imports the file', () => {  
    callZome.mockClear()
    call.mockClear()
    close.mockClear()
    render(<TestComponent />)    
    setTimeout(() => {
      expect(callZome).toHaveBeenCalledWith('callZomeArg')
      expect(call).toHaveBeenCalledWith('callArg')    
      expect(close).toHaveBeenCalledWith('closeArg')      
    }, 0)
  })
})

