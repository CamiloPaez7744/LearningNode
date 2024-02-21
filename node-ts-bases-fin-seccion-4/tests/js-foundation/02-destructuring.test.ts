import { characters } from '../../src/js-foundation/02-destructuring';

describe('destructuring', () => {
  it('should return Batman', () => {
    expect(characters).toEqual(['Flash','Superman', 'Green Lantern', 'Batman']);
  });

  test('first three characters should be undefined', () => {
    const [ , , ,batman ] = characters;
    expect(batman).toBe('Batman');
  });

  test('first character should be Flash', () => {
    const [flash] = characters;
    expect(flash).toBe('Flash');
  });
});