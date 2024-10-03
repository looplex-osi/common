import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert'
import { setTimeout } from 'node:timers/promises'

import debounce from './debounce.mjs'

describe('# debounce', () => {
  let callCount
  let debouncedFunction
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
    debouncedFunction = debounce(originalFunction, 100)
  })

  it('should not call the function immediately', () => {
    debouncedFunction()
    assert.strictEqual(callCount, 0)
  })

  it('should call the function after the delay', async () => {
    debouncedFunction()
    assert.strictEqual(callCount, 0)

    await setTimeout(150)
    assert.strictEqual(callCount, 1)
  })

  it('should reset the delay if called again before the delay has passed', async () => {
    debouncedFunction()
    await setTimeout(50)
    debouncedFunction()
    await setTimeout(50)
    debouncedFunction()
    await setTimeout(150)
    assert.strictEqual(callCount, 1)
  })

  it('should maintain the correct context (`this`)', async () => {
    let obj = {
      value: 42,
      method: debounce(function () {
        context = this
      }, 100),
    }

    obj.method()
    await setTimeout(150)
    assert.strictEqual(context, obj)
  })

  it('should pass the correct arguments', async () => {
    debouncedFunction(1, 2, 3)
    await setTimeout(150)
    assert.deepStrictEqual(argsPassed, [1, 2, 3])
  })

  it('should call the function only once for rapid successive calls', async () => {
    for (let i = 0; i < 5; i++) {
      debouncedFunction()
      await setTimeout(20)
    }
    await setTimeout(150)
    assert.strictEqual(callCount, 1)
  })

  it('should handle multiple independent debounced functions', async () => {
    let callCountA = 0
    let callCountB = 0

    const funcA = debounce(() => { callCountA++ }, 100)
    const funcB = debounce(() => { callCountB++ }, 100)

    funcA()
    funcB()
    funcA()
    funcB()

    await setTimeout(150)
    assert.strictEqual(callCountA, 1)
    assert.strictEqual(callCountB, 1)
  })

  it('should not call the function if never allowed to elapse', async () => {
    debouncedFunction()
    for (let i = 0; i < 5; i++) {
      await setTimeout(50)
      debouncedFunction()
    }
    await setTimeout(150)
    assert.strictEqual(callCount, 1)
  })

  it('should handle zero delay', async () => {
    let immediateCallCount = 0
    const immediateFunction = debounce(() => { immediateCallCount++ }, 0)

    immediateFunction()
    assert.strictEqual(immediateCallCount, 0)

    await setTimeout(10)
    assert.strictEqual(immediateCallCount, 1)
  })

  it('should work with asynchronous functions', async () => {
    let result
    const asyncFunction = debounce(async () => {
      await setTimeout(50)
      result = 'done'
    }, 100)

    asyncFunction()
    await setTimeout(150)
    assert.strictEqual(result, 'done')
  })

  it('should handle multiple rapid calls and execute once with the last arguments', async () => {
    debouncedFunction('first')
    debouncedFunction('second')
    debouncedFunction('third')

    await setTimeout(150)
    assert.strictEqual(callCount, 1)
    assert.deepStrictEqual(argsPassed, ['third'])
  })

  it('should not execute the function if not called', async () => {
    await setTimeout(150)
    assert.strictEqual(callCount, 0)
  })
})
