const {processInput, closeSession} = require('./run');

afterAll(() => {
    return closeSession();
});
  

test('moving a unplaced bus raises error', () => {
    expect(processInput(null, ["MOVE"])).toBe(null);
});

test('Placing a bus returns a bus in the expected location and orientation', () => {
    expect(processInput(null, ["Place", "1,2,NORTH"])).toEqual([1,2,"NORTH"]);
    expect(processInput([0,0,"SOUTH"], ["Place", "1,2,NORTH"])).toEqual([1,2,"NORTH"]);
});

test('Directional movement for a centered bus works as expected ', () => {
    expect(processInput([3,3,"NORTH"], ["MOVE"])).toEqual([4,3,"NORTH"]);
    expect(processInput([3,3,"SOUTH"], ["MOVE"])).toEqual([2,3,"SOUTH"]);
    expect(processInput([3,3,"EAST"], ["MOVE"])).toEqual([3,4,"EAST"]);
    expect(processInput([3,3,"WEST"], ["MOVE"])).toEqual([3,2,"WEST"]);
});

test('Directional movement refuses out of bounds', () => {
    expect(processInput([5,3,"NORTH"], ["MOVE"])).toEqual([5,3,"NORTH"]);
    expect(processInput([0,3,"SOUTH"], ["MOVE"])).toEqual([0,3,"SOUTH"]);
    expect(processInput([3,5,"EAST"], ["MOVE"])).toEqual([3,5,"EAST"]);
    expect(processInput([3,0,"WEST"], ["MOVE"])).toEqual([3,0,"WEST"]);
});

test('Placement refuses out of bounds', () => {
    expect(processInput(null, ["PLACE", "8,2,NORTH"])).toEqual(null);
    expect(processInput([3,3,"NORTH"], ["PLACE", "8,2,NORTH"])).toEqual([3,3,"NORTH"]);
});

test('Placement refuses bad directions', () => {
    expect(processInput(null, ["PLACE", "2,2,FOOBAR"])).toEqual(null);
    expect(processInput([3,3,"NORTH"], ["PLACE", "2,2,FOOBAR"])).toEqual([3,3,"NORTH"]);
});

test('Placement will override previous bus status', () => {
    expect(processInput([3,3,"NORTH"], ["PLACE", "2,2,SOUTH"])).toEqual([2,2,"SOUTH"]);
});