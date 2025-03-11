interface Window {
  locomotiveScroll?: {
    scrollTo: (
      target: string | HTMLElement,
      options?: { [key: string]: unknown }
    ) => void;
    update?: () => void;
    destroy: () => void;
  };
}
