import {Uint64BE} from 'int64-buffer';
import 'mocha';

export default class Identity {
  protected readonly mask = {
    block: 0x0000000000FFFFFF, index: 0x000000000000001F, multicast: 0x010000, locally: 0x020000
  };

  constructor(code: number, organization: number = 0, index: number = 0) {
    this.code = code;
    this.organization = organization;
    this.index = index;
  }

  protected _code: number = 0;

  get code() {
    return this._code;
  }

  set code(value: number) {
    // noinspection NonShortCircuitBooleanExpressionJS
    this._code = value & this.mask.block;
  }

  protected _index: number = 0;

  get index() {
    return this._index;
  }

  set index(value: number) {
    // noinspection NonShortCircuitBooleanExpressionJS
    this._index = value & this.mask.index;
  }

  protected _organization: number = 0;

  get organization() {
    return this._organization;
  }

  set organization(value: number) {
    // noinspection NonShortCircuitBooleanExpressionJS
    this._organization = value & this.mask.block;
  }

  static from(item: number | string) {
    const data = ('number' === typeof item) ? item : parseInt(item, 16);
    const buffer = new Uint64BE(data).toBuffer();
    const code = buffer.readUIntBE(5, 3);
    const organization = buffer.readUIntBE(2, 3);
    const index = buffer.readUInt8(1);
    return new Identity(code, organization, index);
  }

  static validate(item: any) {
    if ('number' === typeof item) {
      return (Number.isSafeInteger(item) && (0 <= item));
    }

    if (false === /^([0-9a-fA-F]+)$/.test(item)) {
      return false;
    }

    try {
      const data = parseInt(item, 16);
      return Number.isSafeInteger(data);
    } catch (error) {
      return false;
    }
  }

  formatCode() {
    return this.code.toString(16).toUpperCase();
  }

  formatIndex() {
    return this.hex(this.index, 2).toUpperCase();
  }

  isLocally() {
    // noinspection NonShortCircuitBooleanExpressionJS
    return Boolean(this.organization & this.mask.locally);
  }

  isMulticast() {
    // noinspection NonShortCircuitBooleanExpressionJS
    return Boolean(this.organization & this.mask.multicast);
  }

  toNumber() {
    return parseInt(this.toString(), 16);
  }

  toString() {
    const organization = this.hex(this.organization, 6);
    const code = this.hex(this.code, 6);
    const index = this.hex(this.index, 4);
    return (index + organization + code).toUpperCase();
  }

  // noinspection JSMethodCanBeStatic
  protected hex(value: number, length: number) {
    const text = value.toString(16);
    const count = (length > text.length) ? (length - text.length) : 0;
    return ('0'.repeat(count) + text).substr(0, length);
  }

}
