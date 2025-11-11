import { Suspense, type FC, type ReactNode } from "react";
import Loading from "../pages/Loading";

export const LazyWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);
