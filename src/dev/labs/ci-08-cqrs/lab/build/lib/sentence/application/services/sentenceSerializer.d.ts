import { Sentence, SentenceSerializer } from 'lambdaorm-base';
export declare class SentenceSerializerImp implements SentenceSerializer {
    clone(sentence: Sentence): Sentence;
    serialize(sentence: Sentence): string;
    deserialize(value: string): Sentence;
    private _serialize;
    private _deserialize;
}
