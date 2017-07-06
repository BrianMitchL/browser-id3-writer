const assert = require('assert');
const ID3Writer = require('../dist/browser-id3-writer');

describe('Commom usage', () => {
    it('Copy data from buffer & add padding', () => {
        const payload = new Uint8Array([1, 2, 3]);
        const writer = new ID3Writer(payload.buffer);
        writer.padding = 5;
        writer.addTag();
        const actual = new Uint8Array(writer.arrayBuffer);
        const expected = new Uint8Array([
            73, 68, 51, // ID3 magic nubmer
            3, 0, // version
            0, // flags
            0, 0, 0, 5, // tag size without header
            0, 0, 0, 0, 0, // padding
            1, 2, 3 // payload
        ]);
        assert.deepStrictEqual(actual, expected);
    });
});
