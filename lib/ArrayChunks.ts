export default class ArrayChunks<Item> implements Iterable<Item[]> {
  private array: Array<Item>;
  readonly stride: number;

  constructor(array: Array<Item>, stride: number) {
    this.array = array;
    this.stride = stride;
  }

  *[Symbol.iterator](): Iterator<Item[]> {
    for (let i = 0; i < Math.floor(this.array.length / this.stride); i += this.stride) {
      yield this.array.slice(i * this.stride, i * this.stride + this.stride)
    }
  }

  remainingItems(): Item[] {
    return this.array.slice(this.stride * Math.floor(this.array.length / this.stride), undefined)
  }
}
