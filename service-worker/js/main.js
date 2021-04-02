window.addEventListener('load', ev => {
  navigator.serviceWorker.register('../sw_cached_site.js').then(reg => {
    console.log('serviceWorker registered !!');
  }).catch(err => {
    console.log('serviceWorker is giving error !! ');
  })
});
