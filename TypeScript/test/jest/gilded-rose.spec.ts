import { Item, GildedRose } from '@/gilded-rose';

function range(n) {
  return [...Array(n).keys()]
}

describe('Gilded Rose system for standard products', () => {
  let gildedRose

  beforeEach(() => {
    const standardItem = new Item('Sausages', 5, 12)
    gildedRose = new GildedRose([standardItem]);
  })

  it('should lower the SellIn & Quality values by 1 each day', () => {
    gildedRose.updateQuality();
    const updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.name).toBe('Sausages');
    expect(updatedStandardItem.sellIn).toBe(4);
    expect(updatedStandardItem.quality).toBe(11);
  });

  it('should lower the SellIn & Quality values linearly after multiple days', () => {
    range(4).forEach(day => gildedRose.updateQuality());
    const updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.sellIn).toBe(1);
    expect(updatedStandardItem.quality).toBe(8);
  })

  it('should lower the Quality value twice faster when SellIn value is negative', () => {
    range(6).forEach(day => gildedRose.updateQuality());
    let updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.sellIn).toBe(-1);
    expect(updatedStandardItem.quality).toBe(5);

    gildedRose.updateQuality()
    updatedStandardItem = gildedRose.items[0];
    expect(updatedStandardItem.sellIn).toBe(-2);
    expect(updatedStandardItem.quality).toBe(3);
  })

  it('should never lower the Quality value under 0, no matter how many days have passed after the SellIn day', () => {
    range(10).forEach(day => gildedRose.updateQuality());
    const updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.sellIn).toBe(-5);
    expect(updatedStandardItem.quality).toBe(0)
  })

  it('should not increase a Quality value above 50 for products whose quality increase with time', () => {
    const productIncreasingInQuality = new Item('Aged Brie', 5, 10);
    const gildedRose = new GildedRose([productIncreasingInQuality]);

    range(45).forEach(day => gildedRose.updateQuality());
    expect(gildedRose.items[0].quality).toBe(50)
  })
});
