const {processInput, closeSession} = require('./process');

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
    expect(processInput([3,3,"NORTH"], ["MOVE"])).toEqual([3,4,"NORTH"]);
    expect(processInput([3,3,"SOUTH"], ["MOVE"])).toEqual([3,2,"SOUTH"]);
    expect(processInput([3,3,"EAST"], ["MOVE"])).toEqual([4,3,"EAST"]);
    expect(processInput([3,3,"WEST"], ["MOVE"])).toEqual([2,3,"WEST"]);
});

test('Directional movement refuses out of bounds', () => {
    expect(processInput([3,5,"NORTH"], ["MOVE"])).toEqual([3,5,"NORTH"]);
    expect(processInput([3,0,"SOUTH"], ["MOVE"])).toEqual([3,0,"SOUTH"]);
    expect(processInput([5,3,"EAST"], ["MOVE"])).toEqual([5,3,"EAST"]);
    expect(processInput([0,3,"WEST"], ["MOVE"])).toEqual([0,3,"WEST"]);
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

test('Rotation works as expected', () => {
    expect(processInput([3,3,"NORTH"], ["LEFT"])).toEqual([3,3,"WEST"]);
    expect(processInput([3,3,"SOUTH"], ["LEFT"])).toEqual([3,3,"EAST"]);
    expect(processInput([3,3,"EAST"], ["LEFT"])).toEqual([3,3,"NORTH"]);
    expect(processInput([3,3,"WEST"], ["LEFT"])).toEqual([3,3,"SOUTH"]);
    expect(processInput(null, ["LEFT"])).toEqual(null);
    expect(processInput([3,3,"NORTH"], ["RIGHT"])).toEqual([3,3,"EAST"]);
    expect(processInput([3,3,"SOUTH"], ["RIGHT"])).toEqual([3,3,"WEST"]);
    expect(processInput([3,3,"EAST"], ["RIGHT"])).toEqual([3,3,"SOUTH"]);
    expect(processInput([3,3,"WEST"], ["RIGHT"])).toEqual([3,3,"NORTH"]);
    expect(processInput(null, ["RIGHT"])).toEqual(null);
});

test('Reporting does not alter the state of the bus', () => {
    expect(processInput([3,3,"NORTH"], ["REPORT"])).toEqual([3,3,"NORTH"]);
    expect(processInput(null, ["REPORT"])).toEqual(null);
});

test('Invalid commands do not alter the state of the bus', () => {
    expect(processInput([3,3,"NORTH"], ["FOOBAR"])).toEqual([3,3,"NORTH"]);
    expect(processInput(null, ["FOOBAR"])).toEqual(null);
});

test('It passes example input A', () => {
    let bus = null;
    bus = processInput(bus, ["PLACE", "0,0,NORTH"])
    bus = processInput(bus, ["MOVE"])
    expect(bus).toEqual([0,1,"NORTH"]);
});

test('It passes example input B', () => {
    let bus = null;
    bus = processInput(bus, ["PLACE", "0,0,NORTH"])
    bus = processInput(bus, ["LEFT"])
    expect(bus).toEqual([0,0,"WEST"]);
});

test('It passes example input C', () => {
    let bus = null;
    bus = processInput(bus, ["PLACE", "1,2,EAST"])
    bus = processInput(bus, ["MOVE"])
    bus = processInput(bus, ["MOVE"])
    bus = processInput(bus, ["LEFT"])
    bus = processInput(bus, ["MOVE"])
    expect(bus).toEqual([3,3,"NORTH"]);
});