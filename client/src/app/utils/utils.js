
export async function debounce(func, timeout = 300){
        let timer;
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this); }, timeout);
        
      }
