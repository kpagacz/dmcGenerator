export default class DateEncoder {
  encode(date: Date): Uint8Array {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Log year, month and day
    console.log("year: ", year, "month: ", month, "day: ", day);

    // Concatenate year, month and day as a single number
    const concatenated = parseInt(month.toString() + day.toString() + year.toString());

    const buffer = Buffer.alloc(8);
    // console.log("number: ", concatenated);
    buffer.writeUInt32LE(concatenated, 0);
    // console.log("buffer: ", buffer);
    return buffer.reverse().subarray(buffer.findIndex((x) => x !== 0));
  }
}
