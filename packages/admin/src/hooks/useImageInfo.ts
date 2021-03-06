import { useEffect, useState } from 'react';

export function useImageInfo(url: string) {
   const [size, setSize] = useState([0, 0]);

   useEffect(() => {
      if (!url) return;
      const img = document.createElement('img');
      img.addEventListener('load', (e) => {
         const target = e.target as any;
         const { naturalHeight, naturalWidth } = target;
         setSize([naturalWidth, naturalHeight]);
      });
      img.src = url;
   }, [url]);

   return size;
}
