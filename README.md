# react-holochain-hooks

Connect to a running [Holochain](https://github.com/holochain/holochain-rust) conductor using a [React hook](https://reactjs.org/docs/hooks-intro.html).

### Heads up
This is an early version. It works fine, but there is still work to be done on the API, so expect it to change.

# Installation

`npm install @hylozoic/react-apollo-hooks`

# Example App

[Zome Explorer](https://github.com/Hylozoic/zome-explorer) will soon use this module.

# Usage

## Basic usage

This is a React hook, so you have to follow the [rules of hooks](https://reactjs.org/docs/hooks-rules.html) in using it.

```
import useHolochainConnection from '@hylozoic/react-holochain-hooks'

function MyComponent () {
  const { callZomeRef } = useHolochainConnection(CONDUCTOR_WEBSOCKET_URL)

  const callSpecificZomeFunction = callZomeRef.current(INSTANCE_ID, ZOME_NAME, ZOME_FUNCTION_NAME)

  return <div>
    <div onClick={() => callSpecificZomeFunction({param1: "a", param2: "b"})}>Go</div>
  </div>

}
```

Where CONDUCTOR_WEBSOCKET_URL is the url from the websocket interface you set up in your conductor-config.toml file and INSTANCE_ID is the instance id from the same file.

## Details

useHolochainConnection returns an object with four keys.

`const { callZomeRef, callRef, closeRef, wsRef } = useHolochainConnection(CONDUCTOR_WEBSOCKET_URL)`

`callZomeRef` for calling zome functions. It takes `('instanceId', 'zome', 'funcName')` and returns a function which when called with a params object, calls the specified zome function and returns a promise with the result
`callRef` for calling conductor functions. It takes a string which is the path to the conductor function and returns a function like above.
`closeRef` for closing the connection.
`wsRef` the websocket object (kind of. Actually the object returned by [rpc-websockets](https://github.com/elpheria/rpc-websockets) which is a wrapper for a webscoket and behaves like one in some ways)

These are all [React refs](https://reactjs.org/docs/refs-and-the-dom.html), so to get at the actual function or object you say `callZome.current()`

These are the functions and objects returned from [hc-web-client](https://github.com/holochain/hc-web-client).connect, so read the docs there for more details

### Useless wsRef
Because of the interaction between asyncronous hooks and refs, wsRef is not super useful at the moment. The main thing you want the websocket object is to access the ready state, so for now you can use a callback. See [Using ready state](#using-ready-state) below for details. I'm currently looking in to a better solution for this, and this is the part of the API most likely to change in the future.

## Configuring connection

The second argument to `useHolochainConnection` is a config object that's passed to [rpc-websockets](https://github.com/elpheria/rpc-websockets). See those docs for more details

```
const wsClientConfig = {
  autoconnect = true,
  reconnect = true,
  reconnect_interval = 1000,
  max_reconnects = 5
}
const { callZomeRef } = useHolochainConnection(CONDUCTOR_WEBSOCKET_URL, wsClientConfig)
```

## Using ready state

The third argument to `useHolochainConnection` is a callback function that is called when the state of the connection changes. It's passed `true` if the connection is ready, otherwise `false`.

```
const [ready, setReady] = useState(false)
const { callZomeRef } = useHolochainConnection(CONDUCTOR_WEBSOCKET_URL, {}, setReady)

return <div>
  {ready ? "It's ready!" : "Not ready yet"}
</div>

```

