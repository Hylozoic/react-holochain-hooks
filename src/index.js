import { useEffect, useRef } from 'react'
import { connect } from '@holochain/hc-web-client'

export default function useHolochainWebClient (url) {
  console.log('calling useHolochainWebClient with', url)

  var callZomeRef = useRef(() => console.log('calling DEFAULT callZome'))
  var callRef = useRef(() => console.log('calling DEFAULT call'))
  var closeRef = useRef(() => console.log('calling DEFAULT close'))

  useEffect(() => {
    var connection
    async function connectToConductor () {
      console.log('running connectToConductor')
      connection = await connect(url)
      console.log('got connection', connection)
      console.log('setting refs to')
      callZomeRef.current = connection.callZome  
      callRef.current = connection.call  
      closeRef.current = connection.close  
      console.log(callZomeRef, callRef, closeRef)
    }
    console.log('about to run connectToConductor')
    connectToConductor()
    console.log('just ran connectToConductor')
    return () => {
      if (connection && connection.close) {
        connection.close()
      }
    }
  })

  console.log('about to return', callZomeRef, callRef, closeRef)

  return { callZomeRef, callRef, closeRef }
}