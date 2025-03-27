describe('S.$', function () {
	it('returns a non-signal value', function () {
		expect(S.$(1)).toBe(1);
	});

	it('unwraps a single data signal', function () {
		expect(S.$(S.data(42))).toBe(42);
	});

	it('unwraps a single value signal', function () {
		expect(S.$(S.value(42))).toBe(42);
	});

	it('unwraps multiple data signals', function () {
		expect(S.$(S.data(S.data(S.data(42))))).toBe(42);
	});

	it('unwraps multiple value signals', function () {
		expect(S.$(S.value(S.value(S.value(42))))).toBe(42);
	});

	it('unwraps mixed data/value signals', function () {
		expect(S.$(S.value(S.data(S.value(S.data(42)))))).toBe(42);
	});

	it('unwraps a single computation', function () {
		let d = S.data(42);
		expect(S.root(() => S.$(S(() => d())))).toBe(42);
	});

	it('unwraps a combination of computations, values, and data signals', function () {
		let d = S.data(42);
		d = S.value(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = S.value(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		expect(S.$(d)).toBe(42);
	});

	it('subscribes all intermediates to updates when used within a computation', function () {
		const original = S.value(42);
		let d = S.data(original);
		d = S.value(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = S.value(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = S.data(d);
		d = S.value(d);
		d = ((d) => S.root(() => S(() => d())))(d);
		d = ((d) => S.root(() => S(() => d())))(d);

		let last_value = null;
		S.root(() =>
			S(() => {
				last_value = S.$(d);
			}),
		);
		expect(last_value).toBe(42);
		original(1337);
		expect(last_value).toBe(1337);
	});
});
