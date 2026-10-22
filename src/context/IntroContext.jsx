import { createContext, useContext } from "react";

/** True once the loader has started lifting and the page may play its entrance. */
export const IntroContext = createContext(true);

export function useIntroDone() {
  return useContext(IntroContext);
}
