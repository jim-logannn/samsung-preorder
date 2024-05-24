// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const breakpointKeys = ["xs", "sm", "md", "lg", "xl"];

export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl";
export type Unit = "px" | "rem" | "em" | "%";
export interface CreateBreakpointProps {
  values?: Record<BreakpointName, number>;
  unit?: Unit;
  step?: number;
}

export const DEFAULT_BREAKPOINT_CONFIG: Required<CreateBreakpointProps> = {
  values: {
    xs: 0, // phone
    sm: 600, // tablets
    md: 900, // small laptop
    lg: 1200, // desktop
    xl: 1536, // large screens
  },
  unit: "px",
  step: 1,
};

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints({
  values = DEFAULT_BREAKPOINT_CONFIG.values,
  unit = DEFAULT_BREAKPOINT_CONFIG.unit,
  step = DEFAULT_BREAKPOINT_CONFIG.step,
}: CreateBreakpointProps) {
  const keys = Object.keys(values) as Array<BreakpointName>;

  const getMediaQueryValue = (key: BreakpointName | number): number | void => {
    if (typeof key === "number") {
      return key;
    } else if (typeof values[key] === "number") {
      return values[key];
    }
  };

  /**
   *
   * @param key BreakpointName or width
   * @returns min-width
   */
  const up = (key: BreakpointName | number): string | void => {
    const value = getMediaQueryValue(key);
    if (value) {
      return `@media (min-width:${value}${unit})`;
    }
  };

  /**
   *
   * @param key BreakpointName or width
   * @returns max-width
   */
  const down = (key: BreakpointName | number): string | void => {
    const value = getMediaQueryValue(key);
    if (value) {
      return `@media (max-width:${value - step}${unit})`;
    }
  };

  /**
   *
   * @param key BreakpointName or width
   * @returns min-width and max-width
   */
  const between = (
    start: BreakpointName | number,
    end: BreakpointName | number
  ): string | void => {
    const startValue = getMediaQueryValue(start);
    const endValue = getMediaQueryValue(end);
    if (typeof startValue === "number" && typeof endValue === "number") {
      return `@media (min-width:${startValue}${unit}) and (max-width:${
        endValue - step
      }${unit})`;
    }
  };

  /**
   *
   * @param key - BreakpointName only, not support custom width
   * @returns between or up function result
   */
  function only(key: BreakpointName) {
    const nextKey = keys[keys.indexOf(key) + 1];
    if (keys.indexOf(key) + 1 < keys.length && typeof key !== "number") {
      const startValue = getMediaQueryValue(key);
      const endValue = getMediaQueryValue(nextKey);
      if (typeof startValue === "number" && typeof endValue === "number") {
        return between(startValue, endValue);
      }
    }
    return up(key);
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    unit,
  };
}
