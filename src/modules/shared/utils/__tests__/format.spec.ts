import {formatPrice} from '../format'

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(100)).toBe('$100.00')
    expect(formatPrice(100.5)).toBe('$100.50')
  })
})
