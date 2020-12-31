export function roundTo(number, decimalPlaces) {
    return Number(Math.round(number + 'e' + decimalPlaces) + "e-" + decimalPlaces)
}
