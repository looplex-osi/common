import { describe, it } from 'node:test'
import assert from 'node:assert'

import itFromPath from './itFromPath.mjs'

describe('# itFromPath', () => {
  it('should handle simple dot notation paths', () => {
    assert.deepStrictEqual(itFromPath('a.b.c'), [
      { key: 'a', isArrayIndex: false },
      { key: 'b', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
  })

  it('should handle array indices in brackets', () => {
    assert.deepStrictEqual(itFromPath('a[0].b'), [
      { key: 'a', isArrayIndex: false },
      { key: '0', isArrayIndex: true },
      { key: 'b', isArrayIndex: false }
    ])
    assert.deepStrictEqual(itFromPath('a[1][2]'), [
      { key: 'a', isArrayIndex: false },
      { key: '1', isArrayIndex: true },
      { key: '2', isArrayIndex: true }
    ])
  })

  it('should handle quoted property names inside brackets', () => {
    assert.deepStrictEqual(itFromPath('a["b"].c'), [
      { key: 'a', isArrayIndex: false },
      { key: 'b', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
    assert.deepStrictEqual(itFromPath("a['b'].c"), [
      { key: 'a', isArrayIndex: false },
      { key: 'b', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
  })

  it('should handle quoted property names with dots inside', () => {
    assert.deepStrictEqual(itFromPath('a["b.c"].d'), [
      { key: 'a', isArrayIndex: false },
      { key: 'b.c', isArrayIndex: false },
      { key: 'd', isArrayIndex: false }
    ])
    assert.deepStrictEqual(itFromPath("a['b.c'].d"), [
      { key: 'a', isArrayIndex: false },
      { key: 'b.c', isArrayIndex: false },
      { key: 'd', isArrayIndex: false }
    ])
  })

  it('should handle paths with special characters', () => {
    assert.deepStrictEqual(itFromPath('a.$b.c'), [
      { key: 'a', isArrayIndex: false },
      { key: '$b', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
    assert.deepStrictEqual(itFromPath('a._b.c'), [
      { key: 'a', isArrayIndex: false },
      { key: '_b', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
  })

  it('should handle paths with numbers in property names', () => {
    assert.deepStrictEqual(itFromPath('a.b1.c'), [
      { key: 'a', isArrayIndex: false },
      { key: 'b1', isArrayIndex: false },
      { key: 'c', isArrayIndex: false }
    ])
  })

  it('should handle numeric property names', () => {
    assert.deepStrictEqual(itFromPath('a.0.b'), [
      { key: 'a', isArrayIndex: false },
      { key: '0', isArrayIndex: false }, // '0' in dot notation is not treated as an array index
      { key: 'b', isArrayIndex: false }
    ])
  })

  it('should handle empty string path', () => {
    assert.deepStrictEqual(itFromPath(''), [
      { key: '', isArrayIndex: false }
    ])
  })
})
