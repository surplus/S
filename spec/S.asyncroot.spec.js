const wait = (ms) => new Promise((r) => setTimeout(r, ms));

describe('S.unsafeAsyncRoot', function () {
	it('runs an async function as a root', async function () {
		var firstValue = 0;
		var secondValue = 0;
		var computedValue = 0;
		var rootCleanedUp = false;
		var innerCleanedUp = false;
		var overallResult = await S.unsafeAsyncRoot(async (dispose) => {
			await wait(10);
			var computed = S.data(10);
			S(() => {
				computedValue = computed();
			});
			firstValue = 42;
			S(() => {
				S.cleanup(() => {
					innerCleanedUp = true;
				});
			});
			S.cleanup(() => {
				rootCleanedUp = true;
			});
			await wait(10);
			secondValue = 867;
			computed(5309);
			await wait(10);
			dispose();
			return 1337;
		});

		expect(firstValue).toBe(42);
		expect(secondValue).toBe(867);
		expect(computedValue).toBe(5309);
		expect(overallResult).toBe(1337);

		expect(rootCleanedUp).toBe(true);
		expect(innerCleanedUp).toBe(true);
	});
});
