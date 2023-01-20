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
      // If not special Aged Brie or Backstage:
      if (currentItem.name != 'Aged Brie' && currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
        // ...and if quality above 0...
        if (currentItem.quality > 0) {
          // ...and if not special Sulfuras
          if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
            // => then lower Quality by 1.
            currentItem.quality = currentItem.quality - 1
          }
        }
      // Else (if special product):
      } else {
        // if Quality under 50...
        if (currentItem.quality < 50) {
          // => then increase Quality by 1.
          currentItem.quality = currentItem.quality + 1
          // If special Backstage:
          if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
            // If sellIn under 11 days and Quality under 50:
            if (currentItem.sellIn < 11) {
              if (currentItem.quality < 50) {
                // => then increase Quality by 1 more:
                currentItem.quality = currentItem.quality + 1
              }
            }
            // If sellIn under 6 days and Quality under 50:
            if (currentItem.sellIn < 6) {
              if (currentItem.quality < 50) {
                // => then increase Quality by 1 more:
                currentItem.quality = currentItem.quality + 1
              }
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
        //-- If it's not an Aged Brie...:
        if (currentItem.name != 'Aged Brie') {
          // ...if it's not a Backstage....
          if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
            // ...if quality is above 0 and it's not legendary Sulfuras....
            if (currentItem.quality > 0) {
              if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                // ... then lower Quality by 1 extra unit
                currentItem.quality = currentItem.quality - 1
              }
            }
            // ...else, if it's Backstage, set Quality to 0
          } else {
            currentItem.quality = currentItem.quality - currentItem.quality
          }
        // -- If it's an Aged Brie:
        } else {
          // As long as quality is under 50, increase Quality by 1 extra unit
          if (currentItem.quality < 50) {
            currentItem.quality = currentItem.quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
