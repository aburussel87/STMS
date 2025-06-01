
async function loadHeader() {
  try {
    const response = await fetch('header.html');
    const data = await response.text();
    const headerEl = document.querySelector('header');
    headerEl.innerHTML = data;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;
    const scripts = tempDiv.querySelectorAll('script');
    for (const oldScript of scripts) {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
        newScript.defer = true;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
    }
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

loadHeader();
