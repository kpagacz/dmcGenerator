import Visa from "@/lib/types/Visa";
import C40 from "@/lib/seal/C40";
import DateEncoder from "@/lib/seal/DateEncoder";

export default class SealEncoder {
  private textDecoder = new TextDecoder("UTF-8");
  private c40 = new C40();
  private dateEncoder = new DateEncoder();

  encodeVisaToUTF8(visa: Visa): string {
    let decodedSeal = "";

    decodedSeal += this.textDecoder.decode(Uint8Array.from([visa.magicConstant]));
    decodedSeal += this.textDecoder.decode(Uint8Array.from([visa.version - 1]));

    decodedSeal += this.textDecoder.decode(this.c40.encode(visa.countryId.padEnd(3, "<")));
    // TODO: Encode signer and certificate reference properly
    decodedSeal += visa.signer;
    decodedSeal += this.textDecoder.decode(Uint8Array.from([visa.certificateReference]));

    decodedSeal += this.textDecoder.decode(this.dateEncoder.encode(new Date(visa.documentIssueDate)));
    decodedSeal += this.textDecoder.decode(this.dateEncoder.encode(new Date(visa.signatureCreationDate)));

    decodedSeal += this.textDecoder.decode(Uint8Array.from([visa.documentFeatureDefinitionReference]));
    decodedSeal += this.textDecoder.decode(Uint8Array.from([visa.documentTypeCategory]));

    return decodedSeal;
  }

  encodeVisa(visa: Visa): Uint8Array {
    const encodedSeal = [];

    // TODO: finish this method
    encodedSeal.push(visa.magicConstant);
    encodedSeal.push(visa.version - 1);
    encodedSeal.push(...this.c40.encode(visa.countryId.padEnd(3, "<")));

    return Uint8Array.from(encodedSeal);
  }
}
