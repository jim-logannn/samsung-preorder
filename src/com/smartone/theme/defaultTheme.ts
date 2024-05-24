import React from "react";
import { deepMergeObject } from "@smt/util/ObjectUtils";
import { themePrimary } from "@smt/theme/primary";
import { getDefaultTheme } from "./primary/muiStyle";
export function extendDefaultTheme(value: any, isEng?: boolean): any {
  return deepMergeObject(
    getDefaultTheme({ ...themePrimary, isEng}),
    value,
  );
}
