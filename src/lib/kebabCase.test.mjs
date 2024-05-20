import { describe, it } from 'node:test'
import assert from 'node:assert'

import kebabCaseFrom from './kebabCaseFrom.mjs'

describe('# kebabCaseFrom', () => {
  it('should convert a string to kebab case', async () => {
    assert.strictEqual(kebabCaseFrom('Hello World'), 'hello-world')
    assert.strictEqual(kebabCaseFrom('  multiple   spaces  '), 'multiple-spaces')
    assert.strictEqual(kebabCaseFrom('Special!@# Chars'), 'special-chars')
  })
})
