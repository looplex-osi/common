import { describe, it } from 'node:test'
import assert from 'node:assert'

import _get from './_get.mjs'

describe('_get', () => {
  it('should retrieve the value at a simple path', () => {
    const obj = { a: { b: { c: 42 } } }
    const value = _get(obj, 'a.b.c')
    assert.strictEqual(value, 42)
  })

  it('should return undefined for non-existent paths', () => {
    const obj = { a: { b: { c: 42 } } }
    const value = _get(obj, 'a.b.x')
    assert.strictEqual(value, undefined)
  })

  it('should return the default value for non-existent paths', () => {
    const obj = { a: { b: { c: 42 } } }
    const value = _get(obj, 'a.b.x', 'default')
    assert.strictEqual(value, 'default')
  })

  it('should handle array indices in paths', () => {
    const obj = { a: [{ b: 'value' }] }
    const value = _get(obj, 'a[0].b')
    assert.strictEqual(value, 'value')
  })

  it('should handle quoted property names in paths', () => {
    const obj = { a: { 'b.c': { d: 100 } } }
    const value = _get(obj, 'a["b.c"].d')
    assert.strictEqual(value, 100)
  })

  it('should handle numeric property names', () => {
    const obj = { a: { '123': { b: 50 } } }
    const value = _get(obj, 'a.123.b')
    assert.strictEqual(value, 50)
  })

  it('should handle paths provided as arrays', () => {
    const obj = { a: { b: { c: 42 } } }
    const value = _get(obj, ['a', 'b', 'c'])
    assert.strictEqual(value, 42)
  })

  it('should return undefined if the object is null or undefined', () => {
    const obj = null
    const value = _get(obj, 'a.b')
    assert.strictEqual(value, undefined)
  })

  it('should handle intermediate null values', () => {
    const obj = { a: null }
    const value = _get(obj, 'a.b')
    assert.strictEqual(value, undefined)
  })

  it('should retrieve values from arrays', () => {
    const obj = { a: [1, 2, 3] }
    const value = _get(obj, 'a[1]')
    assert.strictEqual(value, 2)
  })

  it('should handle deeply nested structures', () => {
    const obj = { a: { b: [{ c: { d: 'deep' } }] } }
    const value = _get(obj, 'a.b[0].c.d')
    assert.strictEqual(value, 'deep')
  })

  it('should return default value when accessing property on undefined', () => {
    const obj = { a: undefined }
    const value = _get(obj, 'a.b', 'default')
    assert.strictEqual(value, 'default')
  })

  it('should handle empty path', () => {
    const obj = { '': 'empty' }
    const value = _get(obj, '')
    assert.strictEqual(value, 'empty')
  })

  it('should handle root value when path is empty', () => {
    const obj = 42
    const value = _get(obj, '')
    assert.strictEqual(value, 42)
  })

  it('should handle special characters in property names', () => {
    const obj = { 'a-b': { 'c.d': { e_f: 'value' } } }
    const value = _get(obj, 'a-b["c.d"].e_f')
    assert.strictEqual(value, 'value')
  })
})
