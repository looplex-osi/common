import { describe, it } from 'node:test'
import assert from 'node:assert'

import _set from './_set.mjs'

describe('# _set', () => {
  it('should set a value at a simple path', () => {
    const obj = {}
    _set(obj, 'a.b.c', 42)
    assert.deepStrictEqual(obj, { a: { b: { c: 42 } } })
  })

  it('should create arrays for numeric indices', () => {
    const obj = {}
    _set(obj, 'arr[0].value', 'test')
    assert.deepStrictEqual(obj, { arr: [{ value: 'test' }] })
  })

  it('should handle quoted property names', () => {
    const obj = {}
    _set(obj, 'a["b"].c', 123)
    assert.deepStrictEqual(obj, { a: { b: { c: 123 } } })
  })

  it('should overwrite existing values', () => {
    const obj = { a: { b: { c: 1 } } }
    _set(obj, 'a.b.c', 2)
    assert.deepStrictEqual(obj, { a: { b: { c: 2 } } })
  })

  it('should not overwrite existing objects when not necessary', () => {
    const obj = { a: { b: {} } }
    _set(obj, 'a.b.c', 3)
    assert.deepStrictEqual(obj, { a: { b: { c: 3 } } })
  })

  it('should handle non-existent intermediate keys', () => {
    const obj = {}
    _set(obj, 'x.y.z', 'value')
    assert.deepStrictEqual(obj, { x: { y: { z: 'value' } } })
  })

  it('should handle null or primitive intermediate values by overwriting them', () => {
    const obj = { a: null }
    _set(obj, 'a.b', 4)
    assert.deepStrictEqual(obj, { a: { b: 4 } })
  })

  it('should handle numeric property names', () => {
    const obj = {}
    _set(obj, 'a.0.b', 5)
    assert.deepStrictEqual(obj, { a: { 0: { b: 5 } } })
  })

  it('should treat numeric property names as object keys if not an array index', () => {
    const obj = {}
    _set(obj, 'data.123.value', 'test')
    assert.deepStrictEqual(obj, { data: { 123: { value: 'test' } } })
  })

  it('should return the modified object', () => {
    const obj = {}
    const result = _set(obj, 'a.b', 6)
    assert.strictEqual(result, obj)
  })

  it('should handle root not being an object', () => {
    const obj = null
    assert.throws(() => _set(obj, 'a.b', 8), {
      name: 'TypeError',
      message: /Cannot read property/
    })
  })

  it('should handle empty path', () => {
    const obj = {}
    _set(obj, '', 9)
    assert.deepStrictEqual(obj, { '': 9 })
  })
})
