import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHandoff } from '../src/lib/handoff.mjs';

test('preserves case in a valid song ID and opens only the requested action', () => {
  assert.deepEqual(parseHandoff('#play/ZHsixQa_1-f'), {
    kind: 'play', uri: 'moosik://play/ZHsixQa_1-f'
  });
  const room = '0123456789abcdef'.repeat(2);
  assert.deepEqual(parseHandoff('#join/' + room), { kind: 'join', uri: 'moosik://join/' + room });
});

test('navigation anchors and malformed or injected commands never launch an app', () => {
  for (const hash of [
    '', '#preview', '#download', '#play/too-short', '#play/012345678901',
    '#join/' + 'F'.repeat(32), '#join/' + 'f'.repeat(31), '#join/' + 'f'.repeat(33),
    '#play/abcdefghijk?next=remote', '#play/abcdefghijk#part', '#play/abc%2Fefghi',
    '#https://example.test', '#play/abcdefghijk/..', '#open/abcdefghijk'
  ]) assert.equal(parseHandoff(hash), null, hash);
});
