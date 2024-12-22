if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registrado.'))
      .catch(error => console.log('Error al registrar el Service Worker:', error));
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

    e.preventDefault(); // Evita el banner automático del navegador
    deferredPrompt = e;

    // Muestra el botón de instalación
    const installBtn = document.getElementById('installBtn');
    const pwaNotNow = document.getElementById('pwaNotNow');
    const pwaModal = document.getElementById("pwaModal");
    pwaModal.style.display = 'flex'; // Debería hacerlo visible

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt(); // Muestra el cuadro de instalación

        // Elige si el usuario acepta o rechaza la instalación
        deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('PWA instalada');
            pwaModal.style.display = 'none'
        } else {
            console.log('El usuario canceló la instalación');
        }
        deferredPrompt = null;
        });
    });

    pwaNotNow.addEventListener('click', () => {
        pwaModal.style.display = 'none'
    });
});