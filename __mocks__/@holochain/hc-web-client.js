function connect (url) {
  console.log('calling from inside the mocked connect, url', url)    
  const callZome = () => console.log('*** calling mocked callZomeRef')

  const call = () => console.log('*** calling mocked callRef')

  const close = () => console.log('*** calling mocked closeRef')

  return Promise.resolve({
    callZome, call, close
  })
}

module.exports = {
  connect
}