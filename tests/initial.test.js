
test("Add 1 + 2 to equal 3", () => {
	expect([1,2].reduce((a,b)=>a+b)).toBe(3);
});