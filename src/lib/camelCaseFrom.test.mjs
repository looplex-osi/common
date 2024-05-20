import { describe, it } from 'node:test'
import assert from 'node:assert'

import camelCaseFrom from './camelCaseFrom.mjs'

describe('# camelCaseFrom', () => {
  it('should convert a string to camel case', async () => {
    assert.strictEqual(camelCaseFrom('Hello World'), 'helloWorld')
    assert.strictEqual(camelCaseFrom('  multiple   spaces  '), 'multipleSpaces')
    assert.strictEqual(camelCaseFrom('Special!@# Chars'), 'specialChars')
  })
})
