import Visa from "@/lib/types/Visa";
import C40 from "@/lib/seal/C40";
import DateEncoder from "@/lib/seal/DateEncoder";

export default class SealEncoder {
  private textDecoder = new TextDecoder("UTF-8");
  private c40 = new C40();
  private dateEncoder = new DateEncoder();

  encodeVisaToUTF8(visa: Visa): string {
    return this.textDecoder.decode(this.encodeVisa(visa));
  }

  encodeVisa(visa: Visa): Uint8Array {
    const encodedSeal = [];

    // Header
    encodedSeal.push(Number(visa.magicConstant));
    encodedSeal.push(Number(visa.version) - 1);
    encodedSeal.push(...this.c40.encode(visa.countryId.padEnd(3, "<")));
    encodedSeal.push(...this.c40.encode(visa.signer.concat(visa.certificateReference)));
    const issueDate = new Date(visa.documentIssueDate);
    encodedSeal.push(...this.dateEncoder.encode(issueDate));
    const signatureDate = new Date(visa.signatureCreationDate);
    encodedSeal.push(...this.dateEncoder.encode(signatureDate));
    encodedSeal.push(Number(visa.documentFeatureDefinitionReference));
    encodedSeal.push(Number(visa.documentTypeCategory));

    // Document Features


    // Signature

    console.log(encodedSeal);
    return Uint8Array.from(encodedSeal);
  }
}
