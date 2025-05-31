export default function InRangeValue(
    value: number,
    min: number,
    max: number,
    /** If `true`, the `value` will be compared against [min,max] and transitioned to next value */
    chained: boolean = true,
) {
    if (chained === true) {
        return value < min
            ? max
            : value > max ? min : value;
    } else {
        return Math.min(max, Math.max(value, min));
    }
}
