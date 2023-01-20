export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

enum SPECIAL_PRODUCTS {
  agedBrie = 'Aged Brie',
  backstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  sulfuras = 'Sulfuras, Hand of Ragnaros',
  conjured = 'Conjured'
}

export class GildedRose {
  items: Array<Item>;
  maxQuality: number;
  minQuality: number;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.maxQuality = MAX_QUALITY;
    this.minQuality = MIN_QUALITY;
  }

  private setItemQuality(item: Item, amount: number) {
    if (!amount) return;

    const updatedQuality = item.quality + amount

    item.quality = updatedQuality >= this.minQuality
      ? Math.min(updatedQuality, this.maxQuality)
      : Math.max(updatedQuality, this.minQuality)
  }

  private setItemSellIn(item: Item, amount: number) {
    item.sellIn = item.sellIn + amount;
  }

  private isSellDatePassed(item: Item) {
    return item.sellIn <= 0;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      let qualityUpdateValue: number;
      let sellInUpdateValue = -1;

      switch (currentItem.name) {
        case (SPECIAL_PRODUCTS.agedBrie):
          qualityUpdateValue = this.isSellDatePassed(currentItem) ? 2 : 1;
          break;
        case (SPECIAL_PRODUCTS.backstagePasses):
          qualityUpdateValue = this.isSellDatePassed(currentItem) && -currentItem.quality ||
                          currentItem.sellIn < 6 && 3 ||
                          currentItem.sellIn < 11 && 2 ||
                          1
          break;
        case (SPECIAL_PRODUCTS.sulfuras):
          qualityUpdateValue = 0;
          sellInUpdateValue = 0;
          break;
        case (SPECIAL_PRODUCTS.conjured):
          qualityUpdateValue = this.isSellDatePassed(currentItem) ? -4 : -2;
          break;
        default:
          qualityUpdateValue = this.isSellDatePassed(currentItem) ? -2 : -1;
      }

      this.setItemQuality(currentItem, qualityUpdateValue);
      this.setItemSellIn(currentItem, sellInUpdateValue);
    }

    return this.items;
  }
}
