import { useEffect, useRef } from 'react'
import { connect } from '@holochain/hc-web-client'

export default function useHolochainWebClient (url) {
  var callZomeRef = useRef(() => {})
  var callRef = useRef(() => {})
  var closeRef = useRef(() => {})

  useEffect(() => {
    var connection
    async function connectToConductor () {
      connection = await connect(url)
      callZomeRef.current = connection.callZome  
      callRef.current = connection.call  
      closeRef.current = connection.close  
    }
    connectToConductor()
    return () => {
      if (connection && connection.close) {
        connection.close()
      }
    }
  })

  return { callZomeRef, callRef, closeRef }
}