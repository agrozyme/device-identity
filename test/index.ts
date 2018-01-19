import * as assert from 'assert';
import Identity from '../index';

describe('validate', () => {
  const maximumIdentity = 0x001FFFFFFFFFFFFF;

  it('safe', () => {
    assert.strictEqual(maximumIdentity, Number.MAX_SAFE_INTEGER);
  });

  it('max', () => {
    assert.strictEqual(Identity.validate(maximumIdentity), true);
  });

  it('negative', () => {
    assert.strictEqual(Identity.validate(-1), false);
  });

  it('string', () => {
    assert.strictEqual(Identity.validate('001FFFFFFFFFFFFF'), true);
  });

  it('string', () => {
    assert.strictEqual(Identity.validate('1F1FFFFFFFFFFFFF'), false);
  });

});

describe('from', () => {
  const numberIdentity = 0x001F112233445566;
  const identity = Identity.from(numberIdentity);

  it('index', () => {
    assert.strictEqual(identity.index, 0x1F);
  });

  it('organization', () => {
    assert.strictEqual(identity.organization, 0x112233);
  });

  it('code', () => {
    assert.strictEqual(identity.code, 0x445566);
  });

});

describe('new', () => {
  const index = 0x1F;
  const organization = 0x112233;
  const code = 0x445566;
  const identity = new Identity(code, organization, index);

  it('toNumber', () => {
    assert.strictEqual(identity.toNumber(), 0x001F112233445566);
  });

  it('toString', () => {
    assert.strictEqual(identity.toString(), '001F112233445566');
  });

  it('address', () => {
    const numberIdentity = 0x001F112233445566;
    const identity = Identity.from(numberIdentity);
    identity.index = 0;
    assert.strictEqual(identity.toNumber(), 0x112233445566);
  });

});
