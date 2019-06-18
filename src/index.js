import { useEffect, useRef } from 'react'
import { connect } from '@holochain/hc-web-client'

export default function useHolochainWebClient (url, wsClient = {}, setReady = () => {}) {
  var callZomeRef = useRef(() => {})
  var callRef = useRef(() => {})
  var closeRef = useRef(() => {})
  var wsRef = useRef()

  useEffect(() => {
    var connection
    async function connectToConductor () {
      connection = await connect({
        url, 
        wsClient: {
          max_reconnects: 0, 
          reconnect_interval: 2500, 
          ...wsClient
        }
      })

      setReady(connection.ws.ready)
      connection.ws.on('open', () => setReady(true))
      connection.ws.on('close', () => setReady(false))      

      callZomeRef.current = connection.callZome  
      callRef.current = connection.call  
      closeRef.current = connection.close
      wsRef.current = connection.ws
    }
    connectToConductor()
    return () => {
      if (connection && connection.close) {
        connection.close()
      }
    }
  })

  return { callZomeRef, callRef, closeRef, wsRef }
}