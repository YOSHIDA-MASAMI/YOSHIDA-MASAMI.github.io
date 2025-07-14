document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos HTML
    const mainScreen = document.getElementById('mainScreen');
    const playerScreen = document.getElementById('playerScreen');
    const songListElement = document.getElementById('songList'); // El ul donde se listarán las canciones
    const backButton = document.getElementById('backButton'); // Nuevo botón de volver

    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const coverButton = document.getElementById('coverButton');
    const albumCover = document.getElementById('albumCover');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
    // Eliminadas las referencias a currentTimeEl y totalDurationEl
    const customIcon1 = document.getElementById('customIcon1');
    // const customIcon2 = document.getElementById('customIcon2'); // Comentado o eliminado si no existe en HTML

    let currentSongIndex = 0;
    let isPlaying = false;

    // aqui se definen las canciones desde los archivos
    const playlist = [
        {
            title: "BitterSuite",
            artist: "Billie Eilish",
            cover: "HMHAS.jpg", // ruta a la imagen de la portada
            src: "Bittersuite.mp3" // ruta al archivo de audio
        },
        {
            title: "My Boy",
            artist: "Billie Eilish",
            cover: "ac.jpg", 
            src: "MyBoy.mp3" 
        },
        {
            title: "Ilomilo",
            artist: "Billie Eilish",
            cover: "WWAFSWDWG.jpg",
            src: "Ilomilo.mp3"
        }
        // aqui se agregan mas canciones aquí:
        // {
        //     title: "Nombre de la Canción",
        //     artist: "Nombre del Artista",
        //     cover: "covers/otra-portada.jpg",
        //     src: "songs/otra-cancion.mp3"
        // },
    ];

    // --- Funciones para cambiar de pantalla ---
    function showMainScreen() {
        playerScreen.classList.remove('active');
        playerScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        mainScreen.classList.add('active');
        pauseSong(); // Pausar la música al volver a la pantalla principal
    }

    function showPlayerScreen(songIndex) {
        currentSongIndex = songIndex; // Establece la canción inicial al entrar al reproductor
        loadSong(currentSongIndex);
        playSong(); // Iniciar reproducción automáticamente al entrar
        mainScreen.classList.remove('active');
        mainScreen.classList.add('hidden');
        playerScreen.classList.remove('hidden');
        playerScreen.classList.add('active');
    }

    // --- Función para renderizar la lista de canciones ---
    function renderSongList() {
        songListElement.innerHTML = ''; // Limpiar lista existente
        playlist.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.dataset.index = index; // Guardar el índice de la canción

            listItem.innerHTML = `
                <div class="song-item-info">
                    <span class="song-item-title">${song.title}</span><br>
                    <span class="song-item-artist">${song.artist}</span>
                </div>
                <img src="${song.cover}" alt="Cover" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            `;

            listItem.addEventListener('click', () => {
                showPlayerScreen(index); // Muestra el reproductor y reproduce la canción seleccionada
            });
            songListElement.appendChild(listItem);
        });
    }

    // Funcion para cargar una cancion en el reproductor
    function loadSong(index) {
        const song = playlist[index];
        audioPlayer.src = song.src;
        albumCover.src = song.cover;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;

        // Resetear la barra de progreso y tiempos al cargar una nueva canción
        progressBar.style.width = '0%';
        // Eliminadas las líneas de actualización de currentTimeEl y totalDurationEl

        // Cargar el audio para obtener su duración
        audioPlayer.load();

        // Si estaba reproduciendo, seguir reproduciendo la nueva canción
        if (isPlaying) {
            audioPlayer.play();
        } else {
            // Si no estaba reproduciendo, asegurarse de que el icono sea "play"
            playPauseIcon.src = 'Play.png';
        }
    }

    // Eliminada la función formatTime

    // --- Event Listeners del elemento <audio> ---

    // Cuando el audio está listo para reproducirse
    audioPlayer.addEventListener('loadedmetadata', () => {
        // Eliminada la actualización de totalDurationEl
    });

    // Actualizar la barra de progreso y el tiempo actual
    audioPlayer.addEventListener('timeupdate', () => {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        // Eliminada la actualización de currentTimeEl
    });

    // Cuando la canción termina
    audioPlayer.addEventListener('ended', () => {
        nextSong(); // Ir a la siguiente canción automáticamente
    });

    // --- Funcionalidad del reproductor ---

    function playSong() {
        isPlaying = true;
        playPauseIcon.src = 'Pause.png';
        audioPlayer.play();
        console.log('Música reproduciéndose');
    }

    function pauseSong() {
        isPlaying = false;
        playPauseIcon.src = 'Play.png';
        audioPlayer.pause();
        console.log('Música pausada');
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
        console.log('Saltar a la canción anterior');
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
        console.log('Saltar a la siguiente canción');
    }

    // --- Event Listeners de los botones ---

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);

    coverButton.addEventListener('click', () => {
        console.log('Botón de portada clickeado. Aquí puedes cambiar entre diferentes cosas.');
    });

    progressBarContainer.addEventListener('click', (e) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const containerWidth = rect.width;
        const newTime = (clickX / containerWidth) * audioPlayer.duration;

        if (isFinite(newTime)) { // Asegurarse de que newTime sea un número válido
            audioPlayer.currentTime = newTime;
        }
    });

    customIcon1.addEventListener('click', () => {
        console.log('Icono personalizado 1 (Sonrisa) clickeado.');
    });

    // Event listener para el nuevo botón de volver
    backButton.addEventListener('click', showMainScreen);

    // --- Inicialización ---
    renderSongList(); // Carga la lista de canciones al iniciar
});

//   /\/\  
//  ( o.o) 
//   > ^<  