export interface IWordCounter {
    processChunk(chunk: string): void;
    currentCount(): Map<string, number>;
}

export type WordMap = Map<string, number>;

export class WordCounter implements IWordCounter {
    private wordMap: WordMap;
    private wordFragment: string | null;

    constructor() {
        this.wordMap = new Map();
        this.wordFragment = null;
    }

    private addWordOccurrence(word: string): void {
        // Get current word count
        let count = this.wordMap.get(word);

        // If word doesn't exist, set count to 1, otherwise increment
        count = !count ? 1 : count + 1;

        // Set updated word count
        this.wordMap.set(word, count);
    }

    processChunk(chunk: string): boolean {
        // End of stream, process any remaining fragment and return false
        if (!chunk || !chunk.length) {
            if (this.wordFragment) {
                this.addWordOccurrence(this.wordFragment);
                // Reset word fragment to null
                this.wordFragment = null;
            }
            return false;
        }

        // Get an array of chars in the chunk, remove empty strings
        const chars = chunk.split('');

        for (const char of chars) {
            if (char === ' ') {
                // Start of a new word, process fragment...
                if (this.wordFragment) {
                    this.addWordOccurrence(this.wordFragment);
                    // Reset word fragment to null
                    this.wordFragment = null;
                }
            } else {
                // Char is a character, add to word fragment
                this.wordFragment = this.wordFragment ? this.wordFragment + char : char;
            }
        }

        return true;
    }

    currentCount(): WordMap {
        return this.wordMap;
    }
}
