interface ProductConfig {
  minSellInDay: number;
  maxSellInDay: number;
  qualityIncrement: number;
  sellInIncrement?: number;
}

interface GildedRoseConfig {
  minQuality: number;
  maxQuality: number;
  products: {
    default: ProductConfig[];
    [productName: string]: ProductConfig[];
  }
}

const CONFIG: GildedRoseConfig = {
  minQuality: 0,
  maxQuality: 50,
  products: {
    default: [
      { minSellInDay: 0, maxSellInDay: Infinity, qualityIncrement: -1 },
      { minSellInDay: -Infinity, maxSellInDay: 0, qualityIncrement: -2 }
    ],
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
  }
};

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
  items: Item[];
  config: GildedRoseConfig;
  maxQuality: number;
  minQuality: number;

  constructor(items = [] as Item[]) {
    this.items = items;
    this.config = CONFIG;
    this.maxQuality = this.config.maxQuality;
    this.minQuality = this.config.minQuality;
  }

  updateQuality() {
    for (const item of this.items) {
      const productConfig = this.findProductConfig(item);

      this.setItemQuality(item, productConfig?.['qualityIncrement']);
      this.setItemSellIn(item, productConfig?.['sellInIncrement']);
    }

    return this.items;
  }

  private findProductConfig(item: Item) {
    const productConfig = this.config.products[item.name] || this.config.products['default'];

    const productConfigInCurrentSellInRange = productConfig.find(config => {
      return item.sellIn > config.minSellInDay && item.sellIn <= config.maxSellInDay;
    });

    return productConfigInCurrentSellInRange;
  }

  private setItemQuality(item: Item, increment = -1) {
    if (!increment) return;

    const updatedQuality = item.quality + increment;

    item.quality = updatedQuality >= this.minQuality
      ? Math.min(updatedQuality, this.maxQuality)
      : Math.max(updatedQuality, this.minQuality);
  }

  private setItemSellIn(item: Item, increment = -1) {
    item.sellIn = item.sellIn + increment;
  }
}
