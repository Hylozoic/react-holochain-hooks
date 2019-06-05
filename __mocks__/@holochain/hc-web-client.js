export const callZome = jest.fn()
export const call = jest.fn()
export const close = jest.fn()

export function connect () {
  return Promise.resolve({
    callZome, call, close
  })
}
