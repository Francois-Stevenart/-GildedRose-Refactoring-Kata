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

export class GildedRose {
  items: Array<Item>;
  maxQuality: number;
  minQuality: number;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.maxQuality = 50;
    this.minQuality = 0;
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

      let qualityUpdate: number
      let sellInUpdate = -1;

      switch (currentItem.name) {
        case ('Aged Brie'):
          qualityUpdate = this.isSellDatePassed(currentItem) ? 2 : 1;
          break;
        case ('Backstage passes to a TAFKAL80ETC concert'):
          if (this.isSellDatePassed(currentItem)) {
            qualityUpdate = -currentItem.quality
          } else {
            qualityUpdate = currentItem.sellIn < 6 && 3 || currentItem.sellIn < 11 && 2 || 1
          }
          break;
        case ('Sulfuras, Hand of Ragnaros'):
          qualityUpdate = 0;
          sellInUpdate = 0;
          break;
        default:
          qualityUpdate = this.isSellDatePassed(currentItem) ? -2 : -1;
      }

      this.setItemQuality(currentItem, qualityUpdate);
      this.setItemSellIn(currentItem, sellInUpdate);
    }

    return this.items;
  }
}
