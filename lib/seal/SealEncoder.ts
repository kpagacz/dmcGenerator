import Visa from "@/lib/types/Visa";
import C40 from "@/lib/seal/C40";
import DateEncoder from "@/lib/seal/DateEncoder";

export default class SealEncoder {
  private textDecoder = new TextDecoder("UTF-8");
  private c40 = new C40();
  private dateEncoder = new DateEncoder();

  async encodeVisaToUTF8(visa: Visa): Promise<string> {
    return this.textDecoder.decode(await this.encodeVisa(visa));
  }

  async encodeVisa(visa: Visa): Promise<Uint8Array> {
    const encodedSeal = [];

    // Header
    encodedSeal.push(Number(visa.magicConstant));
    encodedSeal.push(Number(visa.version) - 1);
    encodedSeal.push(...this.c40.encode(visa.countryId.replace(/\>/g, " ")));
    encodedSeal.push(...this.c40.encode(visa.signer.concat(visa.certificateReference)));
    const issueDate = new Date(visa.documentIssueDate);
    encodedSeal.push(...this.dateEncoder.encode(issueDate));
    const signatureDate = new Date(visa.signatureCreationDate);
    encodedSeal.push(...this.dateEncoder.encode(signatureDate));
    encodedSeal.push(Number(visa.documentFeatureDefinitionReference));
    encodedSeal.push(Number(visa.documentTypeCategory));

    // Document Features
    visa.documentFeatures.forEach((documentFeature) => {
      encodedSeal.push(documentFeature.tag);
      encodedSeal.push(...this.encodeLength(documentFeature.length));
      encodedSeal.push(...this.hexToBytes(documentFeature.value));
    })

    // Signature
    let { signature } = await fetch("/api/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seal: Buffer.from(encodedSeal).toString("base64"),
      }),
    }).then(async (response) => {
      const { signature } = await response.json()
      return { signature: Buffer.from(signature, "base64")}
    });
    encodedSeal.push(255)
    encodedSeal.push(signature.length)
    encodedSeal.push(...signature)

    return Uint8Array.from(encodedSeal);
  }

  private hexToBytes(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  }

  // TODO: fix this long form of encoding in DER TLV
  private encodeLength(length: number): Uint8Array {
    if (length <= 255) {
      return Uint8Array.from([length]);
    } else {
      return Uint8Array.from([0xff, Math.floor(length / 256), length % 256])
    }
  }
}
