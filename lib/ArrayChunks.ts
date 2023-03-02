export default class ArrayChunks<Item> implements Iterable<Item[]> {
  private array: Array<Item>;
  readonly stride: number;

  constructor(array: Array<Item>, stride: number) {
    this.array = array;
    this.stride = stride;
  }

  *[Symbol.iterator](): Iterator<Item[], any, undefined> {
    for (let i = 0; i < Math.floor(this.array.length / this.stride) - 1; i += this.stride) {
      yield this.array.slice(i * this.stride, i * this.stride + this.stride)
    }
  }

  remaindingItems(): Item[] {
    return this.array.slice(this.array.length / this.stride, undefined)
  }
}
