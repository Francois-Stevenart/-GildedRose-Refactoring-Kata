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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // For each item...
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      // If quality above 0...
      // ...and if not special Aged Brie or Backstage or Sulfuras
      // => then lower Quality by 1.
      if (currentItem.quality > 0 && !['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(currentItem.name)) {
        currentItem.quality = currentItem.quality - 1
      // Else (if special product):
      } else {
        // if Quality under 50...
        // => then increase Quality by 1.
        if (currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1
        // If special Backstage:
        if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
          // If sellIn under 11 days and Quality under 50:
          // => then increase Quality by 1 more:
          if (currentItem.quality < 50 && currentItem.sellIn < 11) {
            currentItem.quality = currentItem.quality + 1
          }
          // If sellIn under 6 days and Quality under 50:
          // => then increase Quality by 1 more:
          if (currentItem.quality < 50 && currentItem.sellIn < 6) {
            currentItem.quality = currentItem.quality + 1
            }
          }
        }
      }
      // For all items except legendary Sulfuras, decrease sellIn by 1
      if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn = currentItem.sellIn - 1;
      }
      // For all items whose sellIn is under 0....
      if (currentItem.sellIn < 0) {
        // If quality above 0...
        // ...and if not special Aged Brie or Backstage or Sulfuras
        // => then then lower Quality by 1 extra unit
        if (currentItem.quality > 0 && !['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'].includes(currentItem.name)) {
          currentItem.quality = currentItem.quality - 1
        }
        // If it's Backstage:
        if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
          currentItem.quality = currentItem.quality - currentItem.quality
        }
        // If it's Aged Brie and quality under 50
        if (currentItem.name == 'Aged Brie' && currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1
        }
      }
    }

    return this.items;
  }
}
