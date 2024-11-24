const $ = (e)=> document.querySelector(e);

let actualTrack = 0;

const media = {
    poster: $('#album-poster'),

    title : $('.title-box h1'),
    album: $('.title-box h2'),
    artist: $('.title-box h3'),
    //times
    current: $('#current'),
    total : $('#total'),
    bar: $('.progress-bar-out div')

}
// formatea el tiempo a minutos:segundos

function FormatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

function NextMusic (){
    // Avanzar en el arreglo de musicas
    if(actualTrack >= (musics.length-1)){
        actualTrack = 0;
    } else {
        actualTrack++
    }
    SetMusicData();
    Play();

}

function PrevMusic (){
    // retroceder en el arreglo de musicas
    if(actualTrack >= 1 ){ 
        actualTrack-- 
    } else {
        actualTrack = musics.length
    }
    SetMusicData();
    Play();
}

function SetMusicData(){
    //Limpiar los textos
    media.title.innerHTML = '';
    media.artist.innerHTML= '';
    media.album.innerHTML = '';
    media.total.innerHTML = '';
    // ubicacion del archivo
    $('audio').src = musics[actualTrack].src;
    // Agregar datos
    media.poster.src = musics[actualTrack].poster; // imagen
    media.title.innerHTML = musics[actualTrack].title; // titulo
    media.artist.innerHTML = musics[actualTrack].artist; // artista
    media.album.innerHTML = musics[actualTrack].album;
    // tiempo total
    setTimeout(() => {
        media.total.innerHTML = FormatTime($('audio').duration);
    }, 300);
}

function Play () {
    if($('audio').paused) {
        $('audio').play();
        $('.buttons .play h2').style.display = 'flex';
        $('.buttons .play div').style.display = 'none';
    } else {
        $('audio').pause();
        $('.buttons .play h2').style.display = 'none';
        $('.buttons .play div').style.display = 'flex';
    }
}


class Track {
    constructor({
        poster = '',album = '', artist='',
        title = '', src
    }){
        this.poster = `./images/${poster}`;
        this.title = title;
        this.album = album;
        this.artist = artist;

        this.src = `./musics/${src}`;
    }
}

const musics = [
    new Track({
        title: 'Across the line',
        album: 'Minutes to midnight',
        artist: 'Linkin Park',
        poster: 'minutes-to-midnight.jpg',
        src: 'LinkinPark-AcrossTheLine.mp3',
    }),

    new Track({
        title: 'Handclap',
        album: 'Arcane',
        artist: 'Arcane',
        poster: 'Arcane.jpeg',
        src: 'Arcane-Handclap.m4a'
    }),

    new Track({
        title: 'Teeth',
        album: 'Arcane',
        artist: 'Arcane',
        poster: 'Arcane.jpeg',
        src: 'Arcane-Handclap.m4a',
    })
]

SetMusicData();
// Evalua cuando el archivo esta cargado
$('audio').addEventListener('canplaythrough',()=>{
    $('.spinner').style.display = 'none';
    $('.media').style.display = 'grid';
})

// Avanza a la siguiente musica al terminar la actual
$('audio').addEventListener('ended',()=>{
    NextMusic();
})

// Actualiza el tiempo de reproduccion actual 
// y la barra de progreso
$('audio').addEventListener('timeupdate', ()=>{
    const currentTime = FormatTime($('audio').currentTime);
    media.current.innerHTML = '';
    media.current.innerHTML = currentTime;

    const progressPercent = ($('audio').currentTime / $('audio').duration) * 100;
    media.bar.style.width = `${progressPercent.toFixed(0)}%`;

})

  // Buscar una posición específica en el audio 
  // al hacer clic en la barra de progreso
function seekAudio(event) {
    const rect = $('.progress-bar-out').getBoundingClientRect();
    // Posición del clic relativa al contenedor
    const clickX = event.clientX - rect.left; 
    // Calcula el tiempo en base a la posición
    const newTime = (clickX / rect.width) * $('audio').duration;
    // Actualizar el tiempo  
    $('audio').currentTime = newTime; 
}




