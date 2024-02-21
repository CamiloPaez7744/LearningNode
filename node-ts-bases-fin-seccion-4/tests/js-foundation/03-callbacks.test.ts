import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('getUserById', () => { 
  it('should return a user when the id exists', (done) => {
    getUserById(1, (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toEqual({ id: 1, name: 'John Doe' });
      done();
    });
  });

  it('should return an error when the id does not exist', (done) => {
    getUserById(3, (err, user) => {
      expect(err).toBe('User not found with id 3');
      expect(user).toBeUndefined();
      done();
    });
  });
});