import axe from "axe-core";

export interface A11yOptions {}

export interface AxeResults {
  passes: axe.AxeResults["passes"];
  violations: axe.AxeResults["violations"];
}
