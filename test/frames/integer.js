const assert = require('assert');
const ID3Writer = require('../../dist/browser-id3-writer');

const emptyBuffer = new ArrayBuffer(0);

describe('Integer frames', () => {
    it('TLEN', () => {
        const writer = new ID3Writer(emptyBuffer);
        writer.padding = 0;
        writer.setFrame('TLEN', 7200000);
        writer.addTag();
        const actual = new Uint8Array(writer.arrayBuffer);
        const expected = new Uint8Array([
            73, 68, 51, // ID3 magic nubmer
            3, 0, // version
            0, // flags
            0, 0, 0, 18, // tag size without header
            84, 76, 69, 78, // TLEN
            0, 0, 0, 8, // frame size without header
            0, 0, // flags
            0, // encoding
            55, 50, 48, 48, 48, 48, 48 // 7200000
        ]);
        assert.deepStrictEqual(actual, expected);
    });
    it('TYER', () => {
        const writer = new ID3Writer(emptyBuffer);
        writer.padding = 0;
        writer.setFrame('TYER', 2011);
        writer.addTag();
        const actual = new Uint8Array(writer.arrayBuffer);
        const expected = new Uint8Array([
            73, 68, 51, // ID3 magic nubmer
            3, 0, // version
            0, // flags
            0, 0, 0, 15, // tag size without header
            84, 89, 69, 82, // TYER
            0, 0, 0, 5, // frame size without header
            0, 0, // flags
            0, // encoding
            50, 48, 49, 49 // 2011
        ]);
        assert.deepStrictEqual(actual, expected);
    });
});
