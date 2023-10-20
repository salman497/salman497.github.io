
export function loadCss(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      if (links.find((e: any) => e.href === href) === undefined) {
        const lnk = document.createElement('link');
        const loaded = () => {
          lnk.removeEventListener('load', loaded);
          resolve();
        };
        lnk.addEventListener('load', loaded);
        lnk.rel = 'stylesheet';
        lnk.href = href;
        document.head.appendChild(lnk);
      } else {
        resolve();
      }
    });
  }