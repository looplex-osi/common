import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import { setTimeout } from 'node:timers/promises'

import throttle from './throttle.mjs'

describe('# throttle', () => {
  let callCount
  let throttledFunction
  let context
  let argsPassed

  beforeEach(() => {
    callCount = 0
    context = null
    argsPassed = null
    const originalFunction = function (...args) {
      callCount++
      context = this
      argsPassed = args
    }
    throttledFunction = throttle(originalFunction, 100)
  })

  afterEach(async () => {
    // Wait longer than the debounce delay to ensure all debounced functions have executed
    await setTimeout(200)
  })

  it('should call the function immediately on the first call', () => {
    throttledFunction()
    assert.strictEqual(callCount, 1)
  })

  it('should not call the function again within the wait period', async () => {
    throttledFunction()
    throttledFunction()
    throttledFunction()
    assert.strictEqual(callCount, 1)
    // Wait less than the wait period
    await setTimeout(50)
    throttledFunction()
    assert.strictEqual(callCount, 1)
  })

  it('should call the function again after the wait period', async () => {
    throttledFunction()
    await setTimeout(150)
    throttledFunction()
    assert.strictEqual(callCount, 2)
  })

  it('should maintain the correct context (`this`)', () => {
    const obj = {
      value: 42,
      method: throttle(function () {
        context = this
      }, 100)
    }

    obj.method()
    assert.strictEqual(context, obj)
  })

  it('should pass the correct arguments', () => {
    throttledFunction(1, 2, 3)
    assert.deepStrictEqual(argsPassed, [1, 2, 3])
  })

  it('should handle rapid calls and only execute as per throttle limit', async () => {
    for (let i = 0; i < 5; i++) {
      throttledFunction()
      await setTimeout(10)
    }
    assert.strictEqual(callCount, 1)
    await setTimeout(110)
    throttledFunction()
    assert.strictEqual(callCount, 2)
  })

  it('should not execute the function if called only within the wait period', async () => {
    throttledFunction()
    for (let i = 0; i < 5; i++) {
      await setTimeout(10)
      throttledFunction()
    }
    assert.strictEqual(callCount, 1)
  })

  it('should execute multiple times if wait periods have passed between calls', async () => {
    throttledFunction()
    await setTimeout(110)
    throttledFunction()
    await setTimeout(110)
    throttledFunction()
    assert.strictEqual(callCount, 3)
  })

  it('should return the result of the original function', () => {
    const originalFunction = (x) => x * 2
    const throttled = throttle(originalFunction, 100)
    const result = throttled(5)
    assert.strictEqual(result, 10)
  })

  it('should return undefined when the function is throttled (not called)', () => {
    const originalFunction = (x) => x * 2
    const throttled = throttle(originalFunction, 100)
    throttled(5) // First call
    const result = throttled(10) // Should be throttled
    assert.strictEqual(result, undefined)
  })
})
