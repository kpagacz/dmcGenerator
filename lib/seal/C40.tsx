import ArrayChunks from "../ArrayChunks";

export default class C40 {
  decode(bytes: Uint8Array): string {
    return "";
  }

  encode(text: string): Uint8Array {
    const strideIterator = new ArrayChunks<string>(Array.from(text), 3);
    for (let [first, second, third] of strideIterator) {
      console.log(first, second, third);
    }
    return new Uint8Array();
  }
}
