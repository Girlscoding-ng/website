if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./assets/js/sw.js')
          .then(reg => console.log('Service worker registered'))
          .catch(err => err)
    })
}