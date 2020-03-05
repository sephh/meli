import React from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";

export function withTestRouter(
  tree,
  router
) {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
  } = router;

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
      }}
    >
      {tree}
    </RouterContext.Provider>
  );
}
