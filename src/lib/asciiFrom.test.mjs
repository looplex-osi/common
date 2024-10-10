import { describe, it } from 'node:test'
import assert from 'node:assert'

import asciiFrom from './asciiFrom.mjs'

describe('# asciiFrom', () => {
  it('should gracefully handle non-strings', () => {
    assert.strictEqual(asciiFrom(undefined), '')
    assert.strictEqual(asciiFrom(null), '')
    assert.strictEqual(asciiFrom(true), '')
    assert.strictEqual(asciiFrom(false), '')
    assert.strictEqual(asciiFrom(42), '')
    assert.strictEqual(asciiFrom([]), '')
    assert.strictEqual(asciiFrom({}), '')
  })

  it('should convert using compatibility normalization', () => {
    assert.strictEqual(asciiFrom('ﬀ Ⓓ'), 'ff D')
  })

  it('should remove diatrics', () => {
    assert.strictEqual(asciiFrom('áéíóú âêîôû àèìòù ãõñ äëïöü ç'), 'aeiou aeiou aeiou aon aeiou c')
  })
})
