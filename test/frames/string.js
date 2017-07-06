const assert = require('assert');
const ID3Writer = require('../../dist/browser-id3-writer');

const emptyBuffer = new ArrayBuffer(0);

describe('String frames', () => {
    it('TPE1', () => {
        const writer = new ID3Writer(emptyBuffer);
        writer.padding = 0;
        writer.setFrame('TPE1', ['Eminem', '50 Cent']);
        writer.addTag();
        const actual = new Uint8Array(writer.arrayBuffer);
        const expected = new Uint8Array([
            73, 68, 51, // ID3 magic nubmer
            3, 0, // version
            0, // flags
            0, 0, 0, 41, // tag size without header
            84, 80, 69, 49, // TPE1
            0, 0, 0, 31, // frame size without header
            0, 0, // flags
            1, 0xff, 0xfe, // encoding, BOM
            69, 0, 109, 0, 105, 0, 110, 0, 101, 0, 109, 0, 47, 0, // Eminem/
            53, 0, 48, 0, 32, 0, 67, 0, 101, 0, 110, 0, 116, 0 // 50 Cent
        ]);
        assert.deepStrictEqual(actual, expected);
    });
    it('TIT2', () => {
        const writer = new ID3Writer(emptyBuffer);
        writer.padding = 0;
        writer.setFrame('TIT2', 'Forge');
        writer.addTag();
        const actual = new Uint8Array(writer.arrayBuffer);
        const expected = new Uint8Array([
            73, 68, 51, // ID3 magic nubmer
            3, 0, // version
            0, // flags
            0, 0, 0, 23, // tag size without header
            84, 73, 84, 50, // TIT2
            0, 0, 0, 13, // frame size without header
            0, 0, // flags
            1, 0xff, 0xfe, // encoding, BOM
            70, 0, 111, 0, 114, 0, 103, 0, 101, 0
        ]);
        assert.deepStrictEqual(actual, expected);
    });
});
