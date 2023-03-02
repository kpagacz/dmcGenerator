import Visa from "./types/Visa";

export default class SealEncoder {
  private textDecoder = new TextDecoder("UTF-8");

  decodeVisa(visa: Visa): string {
    let decodedSeal = "";

    decodedSeal += this.textDecoder.decode();

    return decodedSeal;
  }
}
