import { describe, it } from 'node:test'
import assert from 'node:assert'

import pascalCaseFrom from './pascalCaseFrom.mjs'

describe('# pascalCaseFrom', () => {
  it('should convert a string to pascal case', async () => {
    assert.strictEqual(pascalCaseFrom('Hello World'), 'HelloWorld')
    assert.strictEqual(pascalCaseFrom('  multiple   spaces  '), 'MultipleSpaces')
    assert.strictEqual(pascalCaseFrom('Special!@# Chars'), 'SpecialChars')
  })
})
