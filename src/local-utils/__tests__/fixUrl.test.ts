import { fixUrl } from '../fixUrl';

describe('fixes relative url correclty', () => {
  it('do not change correct route', () => {
    const route = fixUrl('/route/sample');

    expect(route).toBe('/route/sample');
  });

  it('adds leading slash', () => {
    const route = fixUrl('route/sample');

    expect(route).toBe('/route/sample');
  });

  it('fixes url with two slashes', () => {
    const route = fixUrl('/route//sample');

    expect(route).toBe('/route/sample');
  });

  it('fixes url with many slashes', () => {
    const route = fixUrl('///route//sample//');

    expect(route).toBe('/route/sample');
  });
});

describe('fixes absolute routes correctly', () => {
  it('do not change correct route', () => {
    const route = fixUrl('https://route.com/sample');

    expect(route).toBe('https://route.com/sample');
  });

  it('removes extra slashes in url', () => {
    const route = fixUrl('https://route.com/sample//get');

    expect(route).toBe('https://route.com/sample/get');
  });
});
