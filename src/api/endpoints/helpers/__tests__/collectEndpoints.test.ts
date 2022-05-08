import path from 'path';
import { collectEndpoints } from '../collectEndpoints';

test('Collects endpoints correctly', () => {
  const endpoints = collectEndpoints(path.join(__dirname, '..', '__mocks__'));

  const routes = endpoints.map(({ route }) => route);

  expect(routes).toContain('/users/:id');
  expect(routes).toContain('/users/create');
  expect(routes).toContain('/users');
  expect(routes).toContain('/users/profile');
  expect(routes).toContain('/users/:id/friends');
  expect(routes).toContain('/users/:id/:friendId');
});
