import ArrayChunks from "../ArrayChunks";

export default class C40 {
  private static asciiToC40: Map<string, number> = new Map([
    [" ", 3],
    ["0", 4],
    ["1", 5],
    ["2", 6],
    ["3", 7],
    ["4", 8],
    ["5", 9],
    ["6", 10],
    ["7", 11],
    ["8", 12],
    ["9", 13],
    ["A", 14],
    ["B", 15],
    ["C", 16],
    ["D", 17],
    ["E", 18],
    ["F", 19],
    ["G", 20],
    ["H", 21],
    ["I", 22],
    ["J", 23],
    ["K", 24],
    ["L", 25],
    ["M", 26],
    ["N", 27],
    ["O", 28],
    ["P", 29],
    ["Q", 30],
    ["R", 31],
    ["S", 32],
    ["T", 33],
    ["U", 34],
    ["V", 35],
    ["W", 36],
    ["X", 37],
    ["Y", 38],
    ["Z", 39],
  ]);

  decode(bytes: Uint8Array): string {
    throw new Error("Method not implemented");
  }

  encode(text: string): Uint8Array {
    // Follows the normative specification as defined in [ISO/IEC 16022]
    // https://www.icao.int/Security/FAL/TRIP/Documents/TR%20-%20Visible%20Digital%20Seals%20for%20Non-Electronic%20Documents%20V1.7.pdf
    text = text.replace(">", " ");
    text = text.toUpperCase();
    const strideIterator = new ArrayChunks<string>(Array.from(text), 3);
    const encodedBytes: number[] = [];
    for (let [first, second, third] of strideIterator) {
      console.log(first, second, third);
      console.log(C40.asciiToC40.get(first) ?? 0, C40.asciiToC40.get(second) ?? 0, C40.asciiToC40.get(third) ?? 0);
      const U = (C40.asciiToC40.get(first) ?? 0) * 1600
        + (C40.asciiToC40.get(second) ?? 0) * 40 + (C40.asciiToC40.get(third) ?? 0) + 1;
      console.log("U: ", U);
      encodedBytes.push(Math.floor(U / 256));
      encodedBytes.push(U % 256);
    }
    const remainingItems = strideIterator.remainingItems();
    console.log("Remaining items: ", remainingItems);
    if (remainingItems.length === 1) {
      encodedBytes.push(254);
      encodedBytes.push(remainingItems[0].charCodeAt(0) + 1);
    } else {
      const [first, second] = remainingItems;
      const U = (C40.asciiToC40.get(first) ?? 0) * 1600
        + (C40.asciiToC40.get(second) ?? 0) * 40 + 1;
      encodedBytes.push(Math.floor(U / 256));
      encodedBytes.push(U % 256);
    }
    return Uint8Array.from(encodedBytes);
  }
}
