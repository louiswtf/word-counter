import {WordCounter} from '../src/WordCounter';
import {fromAscii, toAscii} from '../src/utils';

describe('Conversion utils', () => {
    it('converts to ASCII successfully', () => {
        const words = 'convert this';
        const result = toAscii(words);

        expect(result).toEqual('99 111 110 118 101 114 116 32 116 104 105 115');
    });

    it('converts from ASCII successfully', () => {
        const ascii = '116 101 115 116';
        const result = fromAscii(ascii);

        expect(result).toEqual('test');
    });
});

describe('WordCounter', () => {
    it('count the correct number of occurrences of a single word', () => {
        const wordCounter = new WordCounter();
        const chunks = ['some words for the test', 'with test in here twice'];

        for (const chunk of chunks) {
            wordCounter.processChunk(chunk);
        }

        const result = wordCounter.currentCount();

        expect(result.get('test')).toEqual(2);
    });

    it('counts the correct total number of words', () => {
        const wordCounter = new WordCounter();
        const chunks = ['There is nothing in the world', 'so irresistibly contagious', 'as laughter and good humor'];

        for (const chunk of chunks) {
            wordCounter.processChunk(chunk);
        }

        let count = 0;
        wordCounter.currentCount().forEach((value) => {
            count += value;
        });

        expect(count).toEqual(14);
    });

    it('gets the correct word count at any time', () => {
        const wordCounter = new WordCounter();
        const chunks = [
            'I was disconcerted, for I had broken away without quite seeing where I was going to.',
            'Do I want to be a gentleman, to spite her or to gain her over?',
            'Exactly what I myself had thought, many times. Exactly what was perfectly manifest to me at the moment',
        ];

        wordCounter.processChunk(chunks[0]);
        expect(wordCounter.currentCount().get('I')).toEqual(3);

        wordCounter.processChunk(chunks[1]);
        expect(wordCounter.currentCount().get('I')).toEqual(4);

        wordCounter.processChunk(chunks[2]);
        expect(wordCounter.currentCount().get('I')).toEqual(5);
    });

    it('processChunk() returns false when the chunk is an empty string', () => {
        const wordCounter = new WordCounter();
        const chunks = ['not empty', ''];

        const resultOne = wordCounter.processChunk(chunks[0]);
        expect(resultOne).toEqual(true);

        const resultTwo = wordCounter.processChunk(chunks[1]);
        expect(resultTwo).toEqual(false);
    });
});