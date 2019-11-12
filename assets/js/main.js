if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('../sw.js')
          .then(reg => reg)
          .catch(err => err)
    })
}