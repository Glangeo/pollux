import path from 'path';
import { collectEndpoints } from '../collectEndpoints';

test('Collects endpoints in correct order', () => {
  const endpoints = collectEndpoints(path.join(__dirname, '..', '__mocks__'));

  const routes = endpoints.map(({ route }) => route);

  expect(routes[0]).toBe('/users');
  expect(routes[1]).toBe('/users/create');
  expect(routes[2]).toBe('/users/profile');
  expect(routes[3]).toBe('/users/:id');
  expect(routes[4]).toBe('/users/:id/friends');
  expect(routes[5]).toBe('/users/:id/friends/:friendId');

  /**
   * /users
   * /users/create
   * /users/profile
   * /users/:id
   * /users/:id/profile
   * /users/:id/friends
   * /users/:id/firends/:friendId
   */
});
