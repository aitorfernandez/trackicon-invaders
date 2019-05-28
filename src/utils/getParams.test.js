import getParams from './getParams';

describe('getParams', () => {
  let hash;

  it('should return a empty object if not hashParams', () => {
    hash = null;
    expect(getParams(hash)).toEqual({});
  });

  describe('with a valid hash params', () => {
    let hashParams;

    beforeAll(() => {
      hash = '#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123';
      hashParams = getParams(hash);
    });

    it('should return a correct access_token', () => {
      expect(hashParams.access_token).toEqual('NwAExz...BV3O2Tk');
    });

    it('should return a correct token_type', () => {
      expect(hashParams.token_type).toEqual('Bearer');
    });

    it('should return a correct expires_in', () => {
      expect(hashParams.expires_in).toEqual('3600');
    });

    it('should return a correct state', () => {
      expect(hashParams.state).toEqual('123');
    });
  });

  // describe('with a valid search params', () => {
  // });
});
