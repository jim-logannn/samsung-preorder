import React from "react";
import { deepMergeObject } from "@smt/util/ObjectUtils";

export function getDefaultApplicationContext(): ApplicationContextValue {
  return {
    sampleProperty: {
      default: "sampleProperty",
    },
  };
}
export function extendDefaultApplicationContext(
  value?: Partial<ApplicationContextValue>
): ApplicationContextValue {
  return deepMergeObject(getDefaultApplicationContext(), value);
}
export interface ApplicationContextValue {
  sampleProperty: Record<string, string>;
}
export default React.createContext<ApplicationContextValue | undefined>(
  getDefaultApplicationContext()
);
