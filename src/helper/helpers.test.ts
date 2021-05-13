import { getPrice } from "./helpers"

test('price', () => {
    expect(getPrice('$1.1')).toBe(1.1)

    expect(getPrice('$56,997.11')).toBe(56997.11)
})
