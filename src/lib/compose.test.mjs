import { describe, it } from 'node:test'
import assert from 'node:assert'

import compose from './compose.mjs'

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 1))
}

function isPromise (x) {
  return x && typeof x.then === 'function'
}

describe('# compose', () => {
  it('should work', async () => {
    const result = []
    const stack = []

    stack.push(async (context, next) => {
      result.push(1)
      await wait(1)
      await next()
      await wait(1)
      result.push(6)
    })

    stack.push(async (context, next) => {
      result.push(2)
      await wait(1)
      await next()
      await wait(1)
      result.push(5)
    })

    stack.push(async (context, next) => {
      result.push(3)
      await wait(1)
      await next()
      await wait(1)
      result.push(4)
    })

    await compose(stack)({})
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6])
  })
})
