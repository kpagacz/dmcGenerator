import Visa from "@/lib/types/Visa";

export default class SealEncoder {
  private textDecoder = new TextDecoder("UTF-8");

  encodeVisa(visa: Visa): string {
    let decodedSeal = "";

    decodedSeal += this.textDecoder.decode(
      new Uint8Array([visa.magicConstant])
    );

    decodedSeal += this.textDecoder.decode(new Uint8Array([visa.version - 1]));

    decodedSeal += visa.countryId;
    decodedSeal += visa.signer;

    decodedSeal += this.textDecoder.decode(
      new Uint8Array([visa.certificateReference])
    );

    return decodedSeal;
  }
}
