import { useEffect, useState } from "react";

export const usePortalRoot = (id: string) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById(id);
    if (root) setPortalRoot(root);
  }, [id]);

  return portalRoot;
}
