import path from 'path';
import { collectEndpoints } from '../collectEndpoints';

test('Collects endpoints in correct order', () => {
  const endpoints = collectEndpoints(path.join(__dirname, '..', '__mocks__'));

  const routes = endpoints.map(({ route }) => route);

  expect(routes[0]).toBe('/');
  expect(routes[1]).toBe('/sample');
  expect(routes[2]).toBe('/:slug1');
  expect(routes[3]).toBe('/:slug1/sample');
  expect(routes[4]).toBe('/:slug1/:slug2');
  expect(routes[5]).toBe('/:slug1/:slug2/sample');
});
