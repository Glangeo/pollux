import path from 'path';
import { EndpointMethod } from '../../types';
import { collectEndpoints } from '../collectEndpoints';

describe('Endpoints collection from folder', () => {
  test('Collects endpoints in correct order', () => {
    const endpoints = collectEndpoints(
      path.join(__dirname, '..', '__mocks__'),
      'order'
    );

    const routes = endpoints.map(({ route }) => route);

    expect(routes[0]).toBe('/');
    expect(routes[1]).toBe('/sample');
    expect(routes[2]).toBe('/:slug1');
    expect(routes[3]).toBe('/:slug1/sample');
    expect(routes[4]).toBe('/:slug1/:slug2');
    expect(routes[5]).toBe('/:slug1/:slug2/sample');
  });

  test('Adds multiple endpoints for one route', () => {
    const endpoints = collectEndpoints(
      path.join(__dirname, '..', '__mocks__'),
      'multiple'
    );

    const routes = endpoints.map(({ route, method }) => [route, method]);

    expect(routes[0][0]).toBe('/products');
    expect(routes[0][1]).toBe(EndpointMethod.GET);
    expect(routes[1][0]).toBe('/products');
    expect(routes[1][1]).toBe(EndpointMethod.POST);
  });

  test('Throws if multiple endpoints for one route have same method', () => {
    expect(() =>
      collectEndpoints(
        path.join(__dirname, '..', '__mocks__'),
        'multiple-throw'
      )
    ).toThrow();
  });
});
