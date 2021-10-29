// #region imports
    // #region external
    import DeposedString from '../';

    import {
        DeposedStringStages,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
describe('DeposedString', () => {
    it('works', () => {
        const deposedString = new DeposedString('');

        deposedString.push('a');
        deposedString.push('ab');
        deposedString.push('abc');

        const a = deposedString.get(0);
        expect(a).toEqual('a');

        const ab = deposedString.get(1);
        expect(ab).toEqual('ab');

        const abc = deposedString.get(2);
        expect(abc).toEqual('abc');
    });

    it('loads', () => {
        const data: DeposedStringStages = [
            [["+",0,"a"]],
            [["+",1,"b"]],
            [["+",2,"c"]],
        ];

        const deposedString = new DeposedString('');
        deposedString.load(data);

        const a = deposedString.get(0);
        expect(a).toEqual('a');

        const ab = deposedString.get(1);
        expect(ab).toEqual('ab');

        const abc = deposedString.get(2);
        expect(abc).toEqual('abc');
    });


    it.only('handles draftjs state string', () => {
        const a = `{"id":"038897718f9241b4307dce3389bb7aa4","generatedAt":1635446074245,"text":{"blocks":[{"key":"d5ean","text":"one","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4jgiv","text":"threefour","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"feu4t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9nvp0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d73jp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9rdvj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"42ack","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8bl5m","text":"s","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"esllc","text":"fasdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7ehve","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"title":""}`;
        const b = `{"id":"038897718f9241b4307dce3389bb7aa4","generatedAt":1635446074245,"text":{"blocks":[{"key":"d5ean","text":"onetwo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4jgiv","text":"four","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"feu4t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9nvp0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d73jp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9rdvj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"42ack","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8bl5m","text":"s","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"esllc","text":"fasdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7ehve","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"title":""}`;

        const deposedString = new DeposedString('');

        deposedString.push(a);
        deposedString.push(b);

        const deposedA = deposedString.get(0);
        expect(deposedA).toEqual(a);

        const deposedB = deposedString.get(1);
        // console.log('deposedB', deposedB);
        expect(deposedB).toEqual(b);

        const unload = deposedString.unload();
        expect(unload.initial).toEqual('');
        expect(unload.stages.length).toEqual(2);
        // console.log(JSON.stringify(unload, null, 4));
    });
});
// #endregion module
