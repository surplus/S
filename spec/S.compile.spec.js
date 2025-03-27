describe("S.compile", function () {
    it("returns a non-signal value", function () {
        expect(S.compile([1])).toEqual([1]);
    });

    it("unwraps a single signal array", function () {
        expect(S.compile([S.value(42)])).toEqual([42]);
    });

    it("unwraps a nested signal array", function () {
        expect(S.compile([[S.value(42)], [[S.value(1337)]]])).toEqual([42, 1337]);
    });

    it("unwraps a nested signal array within a signal", function () {
        expect(S.compile(S.data([[S.value(42)], [S.value([S.value(1337)])]]))).toEqual([42, 1337]);
    });

    it("unwraps a mixture of signals, computations, and raw values", function () {
        expect(S.compile(S.data([[S.value(42)], [S.value([S.value(S.root(() => S(() => 1337)))]), [], []]]))).toEqual([42, 1337]);
    });
});