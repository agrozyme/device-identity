import {Uint64BE} from 'int64-buffer';

export default class Identity {
  protected readonly addressPartMask = 0x0000000000FFFFFF;
  protected readonly indexMask = 0x000000000000001F;

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
    this._code = value & this.addressPartMask;
  }

  protected _index: number = 0;

  get index() {
    return this._index;
  }

  set index(value: number) {
    // noinspection NonShortCircuitBooleanExpressionJS
    this._index = value & this.indexMask;
  }

  protected _organization: number = 0;

  get organization() {
    return this._organization;
  }

  set organization(value: number) {
    // noinspection NonShortCircuitBooleanExpressionJS
    this._organization = value & this.addressPartMask;
  }

  static from(item: number) {
    const buffer = new Uint64BE(item).toBuffer();
    const code = buffer.readUIntBE(5, 3);
    const organization = buffer.readUIntBE(2, 3);
    const index = buffer.readUInt8(1);
    return new Identity(code, organization, index);
  }

  formatCode() {
    return this.code.toString(16).toUpperCase();
  }

  formatIndex() {
    return this.hex(this.index, 2).toUpperCase();
  }

  toNumber() {
    return parseInt(this.toString(), 16);
  }

  toString() {
    const organization = this.hex(this.organization, 6);
    const code = this.hex(this.code, 6);
    const index = this.hex(this.index, 2);
    return index + organization + code;
  }

  // noinspection JSMethodCanBeStatic
  protected hex(value: number, length: number) {
    const text = value.toString(16);
    const count = (length > text.length) ? (length - text.length) : 0;
    return ('0'.repeat(count) + text).substr(0, length);
  }

}
