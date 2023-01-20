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

  it('should lower the Quality value twice as fast when SellIn value is negative', () => {
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
    const productsIncreasingInQuality = [new Item('Aged Brie', 5, 10), new Item('Backstage passes to a TAFKAL80ETC concert', 60, 20)];
    const gildedRose = new GildedRose(productsIncreasingInQuality);
    range(45).forEach(day => gildedRose.updateQuality());

    gildedRose.items.every(item => expect(item.quality).toBe(50))
  })
});

describe('Gilded Rose system for non-standard products', () => {
  it('should increase the Quality value of "Aged Brie" the older it gets, by 2 when over the SellIn date', () => {
    const agedBrie = new Item('Aged Brie', 5, 10);
    const gildedRose = new GildedRose([agedBrie]);
    range(3).forEach(day => gildedRose.updateQuality());

    expect(gildedRose.items[0].sellIn).toBe(2)
    expect(gildedRose.items[0].quality).toBe(13)

    range(3).forEach(day => gildedRose.updateQuality());

    expect(gildedRose.items[0].sellIn).toBe(-1)
    expect(gildedRose.items[0].quality).toBe(17)
  })

  it('should never alter the Quality and SellIn values of "Sulfaras" as it is a legendary item', () => {
    const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    const gildedRose = new GildedRose([sulfuras]);
    range(3).forEach(day => gildedRose.updateQuality());

    expect(gildedRose.items[0].sellIn).toBe(0)
    expect(gildedRose.items[0].quality).toBe(80)
  })

  it('should increase the Quality value of "Backstage passes" the older it gets, by 2 when 10 days or less left, by 3 when 5 days or less left, and drops it at 0 after concert', () => {
    const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
    const gildedRose = new GildedRose([backstagePasses]);

    range(3).forEach(day => gildedRose.updateQuality());

    expect(gildedRose.items[0].sellIn).toBe(12)
    expect(gildedRose.items[0].quality).toBe(23)

    range(2).forEach(day => gildedRose.updateQuality());

    expect(gildedRose.items[0].sellIn).toBe(10)
    expect(gildedRose.items[0].quality).toBe(25)

    range(5).forEach(day => gildedRose.updateQuality());
    expect(gildedRose.items[0].sellIn).toBe(5)
    expect(gildedRose.items[0].quality).toBe(35)

    range(5).forEach(day => gildedRose.updateQuality());
    expect(gildedRose.items[0].sellIn).toBe(0)
    expect(gildedRose.items[0].quality).toBe(50)

    gildedRose.updateQuality()
    expect(gildedRose.items[0].sellIn).toBe(-1)
    expect(gildedRose.items[0].quality).toBe(0)
  })
})
