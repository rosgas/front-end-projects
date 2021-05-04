const sounds = ['lorikeet','koel', 'noisy','magpie', 'kookaburra', 'galah']

sounds.forEach(sound => {
  const btn = document.createElement('button')
  btn.classList.add ('btn')
  btn.innerHTML = 'Listen'

  btn.addEventListener('click', () => {
    stopSongs()

    document.getElementById(sound).play()
  })
  
  document.querySelector('.buttons').appendChild(btn)
  
})


function stopSongs () {
  sounds.forEach(sound => {
    const song = document.getElementById(sound)

    song.pause()
    song.currentTime = 0; /* The is no stop so we use pause and currentTime to stop the song*/
  })
}



