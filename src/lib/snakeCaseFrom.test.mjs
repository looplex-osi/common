import { describe, it } from 'node:test'
import assert from 'node:assert'

import snakeCaseFrom from './snakeCaseFrom.mjs'

describe('# snakeCaseFrom', () => {
  it('should convert a string to snake case', async () => {
    assert.strictEqual(snakeCaseFrom('Hello World'), 'hello_world')
    assert.strictEqual(snakeCaseFrom('  multiple   spaces  '), 'multiple_spaces')
    assert.strictEqual(snakeCaseFrom('Special!@# Chars'), 'special_chars')
  })
})
