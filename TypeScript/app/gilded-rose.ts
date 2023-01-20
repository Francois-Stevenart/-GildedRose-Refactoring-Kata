interface Config {
  minQuality: number,
  maxQuality: number,
  products: {
    [productName: string]: { minSellInDay: number, maxSellInDay: number, qualityIncrement: number, sellInIncrement?: number }[]
  }
}

const CONFIG: Config = {
  minQuality: 0,
  maxQuality: 50,
  products: {
    'Aged Brie': [
      { minSellInDay: 0, maxSellInDay: Infinity, qualityIncrement: 1 },
      { minSellInDay: -Infinity, maxSellInDay: 0, qualityIncrement: 2 }
    ],
    'Backstage passes to a TAFKAL80ETC concert': [
      { minSellInDay: 10, maxSellInDay: Infinity, qualityIncrement: 1 },
      { minSellInDay: 5, maxSellInDay: 10, qualityIncrement: 2 },
      { minSellInDay: 0, maxSellInDay: 5, qualityIncrement: 3 },
      { minSellInDay: -Infinity, maxSellInDay: 0, qualityIncrement: -Infinity }
    ],
    'Sulfuras, Hand of Ragnaros': [
      { minSellInDay: -Infinity, maxSellInDay: Infinity, qualityIncrement: 0, sellInIncrement: 0 },
    ],
    'Conjured': [
      { minSellInDay: 0, maxSellInDay: Infinity, qualityIncrement: -2 },
      { minSellInDay: -Infinity, maxSellInDay: 0, qualityIncrement: -4 }
    ],
    default: [
      { minSellInDay: 0, maxSellInDay: Infinity, qualityIncrement: -1 },
      { minSellInDay: -Infinity, maxSellInDay: 0, qualityIncrement: -2 }
    ]
  }
}

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
  config: Config;
  maxQuality: number;
  minQuality: number;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.config = CONFIG;
    this.maxQuality = this.config.maxQuality;
    this.minQuality = this.config.minQuality;
  }

  private findRelevantProductConfig(item: Item) {
    return (this.config.products[item.name] || this.config.products['default']).find(config => {
      return item.sellIn > config.minSellInDay && item.sellIn <= config.maxSellInDay
    })
  }

  private setItemQuality(item: Item, amount = -1) {
    if (!amount) return;

    const updatedQuality = item.quality + amount

    item.quality = updatedQuality >= this.minQuality
      ? Math.min(updatedQuality, this.maxQuality)
      : Math.max(updatedQuality, this.minQuality)
  }

  private setItemSellIn(item: Item, amount = -1) {
    item.sellIn = item.sellIn + amount;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      const relevantProductConfig = this.findRelevantProductConfig(currentItem);

      this.setItemQuality(currentItem, relevantProductConfig?.['qualityIncrement']);
      this.setItemSellIn(currentItem, relevantProductConfig?.['sellInIncrement']);
    }

    return this.items;
  }
}
