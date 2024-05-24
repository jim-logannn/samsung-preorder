import createBreakpoints from "../src/theme/util/createBreakpoint";

const default_breakpoints = createBreakpoints({});

describe("test createBreakpoint", () => {
  test("should return correct media query", () => {
    expect(default_breakpoints.up("md")).toBe("@media (min-width:900px)");
    expect(default_breakpoints.down("lg")).toBe("@media (max-width:1199px)");
    expect(default_breakpoints.between("sm", "lg")).toBe(
      "@media (min-width:600px) and (max-width:1199px)"
    );
    expect(default_breakpoints.only("lg")).toBe(
      "@media (min-width:1200px) and (max-width:1535px)"
    );
    expect(default_breakpoints.only("xl")).toBe("@media (min-width:1536px)");
  });
  test("should return custom media query form specific width", () => {
    expect(default_breakpoints.up(450)).toBe("@media (min-width:450px)");
    expect(default_breakpoints.down(900)).toBe("@media (max-width:899px)");
    expect(default_breakpoints.between(768, 1920)).toBe(
      "@media (min-width:768px) and (max-width:1919px)"
    );
  });
  test("should override default configs", () => {
    const custom_values = {
      xs: 0, // phone
      sm: 48, // tablets
      md: 76.8, // small laptop
      lg: 102.4, // desktop
      xl: 120, // large screens
    };
    const test_breakpoints = createBreakpoints({
      values: custom_values,
      unit: "rem",
      step: 0.5,
    });
    expect(test_breakpoints.values).toMatchObject(custom_values);
    expect(test_breakpoints.unit).toBe("rem");
    expect(test_breakpoints.down("lg")).toBe("@media (max-width:101.9rem)");
  });
});
