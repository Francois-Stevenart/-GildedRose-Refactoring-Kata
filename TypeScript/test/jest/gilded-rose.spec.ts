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

  test('should lower the SellIn value by 1 each day', () => {
    gildedRose.updateQuality();
    const updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.name).toBe('Sausages');
    expect(updatedStandardItem.sellIn).toBe(4);
    expect(updatedStandardItem.quality).toBe(11);
  });

  test('should lower the SellIn value linearly after multiple days', () => {
    range(4).forEach(day => gildedRose.updateQuality());
    const updatedStandardItem = gildedRose.items[0];

    expect(updatedStandardItem.name).toBe('Sausages');
    expect(updatedStandardItem.sellIn).toBe(1);
    expect(updatedStandardItem.quality).toBe(8);
  })
});
