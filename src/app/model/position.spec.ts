import { Position } from './position';

describe('Position', () => {
  it('should create an instance', () => {
    expect(new Position(0, 0)).toBeTruthy();
  });

  describe('same()', () => {
    it('should return true if same', () => {
      expect((new Position(3, 2)).same(new Position(3, 2))).toBe(true);
    });

    it('should return false if x not same', () => {
      expect((new Position(3, 2)).same(new Position(4, 2))).toBe(false);
    });

    it('should return false if y not same', () => {
      expect((new Position(3, 2)).same(new Position(3, 3))).toBe(false);
    }); 

    it('should return false if null', () => {
      expect((new Position(3, 2)).same(null)).toBe(false);
    }); 
  });

  describe('adjacent()', () => {
    it('should return true if x is same, y is bigger by 1', () => {
      expect(new Position(3, 2).adjacent(new Position(3, 1))).toBe(true);
    });

    it('should return true if x is same, y is smaller by 1', () => {
      expect(new Position(3, 2).adjacent(new Position(3, 3))).toBe(true);
    });

    it('should return true if y is same, x is bigger by 1', () => {
      expect(new Position(3, 2).adjacent(new Position(2, 2))).toBe(true);
    });

    it('should return false if both x and y are not same', () => {
      expect(new Position(3, 2).adjacent(new Position(2, 3))).toBe(false);
    });

    it('should return false if x is same, y is off by more than 1', () => {
      expect(new Position(3, 2).adjacent(new Position(3, 4))).toBe(false);
    });

    it('should return false if y is same, x is off by more than 1', () => {
      expect(new Position(3, 2).adjacent(new Position(5, 2))).toBe(false);
    });

  });
});
