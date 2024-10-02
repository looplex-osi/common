import { describe, it } from 'node:test'
import assert from 'node:assert'

import itFromPath from './itFromPath.mjs'

describe('# itFromPath', () => {
  it('should handle simple dot notation paths', () => {
    assert.deepStrictEqual(itFromPath('a.b.c'), ['a', 'b', 'c'])
  })

  it('should handle array indices in brackets', () => {
    assert.deepStrictEqual(itFromPath('a[0].b'), ['a', '0', 'b'])
    assert.deepStrictEqual(itFromPath('a[1][2]'), ['a', '1', '2'])
  })

  it('should handle quoted property names inside brackets', () => {
    assert.deepStrictEqual(itFromPath('a["b"].c'), ['a', 'b', 'c'])
    assert.deepStrictEqual(itFromPath("a['b'].c"), ['a', 'b', 'c'])
  })

  it('should handle quoted property names with dots inside', () => {
    assert.deepStrictEqual(itFromPath('a["b.c"].d'), ['a', 'b.c', 'd'])
    assert.deepStrictEqual(itFromPath("a['b.c'].d"), ['a', 'b.c', 'd'])
  })

  it('should return the input if it is an array', () => {
    assert.deepStrictEqual(itFromPath(['a', 'b', 'c']), ['a', 'b', 'c'])
  })

  it('should handle paths with special characters', () => {
    assert.deepStrictEqual(itFromPath('a.$b.c'), ['a', '$b', 'c'])
    assert.deepStrictEqual(itFromPath('a._b.c'), ['a', '_b', 'c'])
  })

  it('should handle paths with numbers in property names', () => {
    assert.deepStrictEqual(itFromPath('a.b1.c'), ['a', 'b1', 'c'])
  })

  it('should handle paths with empty brackets', () => {
    assert.deepStrictEqual(itFromPath('a[].b'), ['a', '', 'b'])
  })

  it('should handle invalid paths gracefully', () => {
    assert.deepStrictEqual(itFromPath(''), [])
    assert.deepStrictEqual(itFromPath('.'), [''])
    assert.deepStrictEqual(itFromPath('..'), ['', ''])
    assert.deepStrictEqual(itFromPath('a..b'), ['a', '', 'b'])
  })

  it('should handle numeric property names', () => {
    assert.deepStrictEqual(itFromPath('a.0.b'), ['a', '0', 'b'])
  })
})
