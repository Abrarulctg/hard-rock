// const searchSong = async () => {
//     const searchText = document.getElementById('search-input').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }

document.getElementById("search-input")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.getElementById("search-button").click();
        }
    });



const searchSong = () => {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchInput}`
    toggleSpinner()
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError(error))
}

const displaySongs = songs => {
    const songContainer = document.getElementById('search-result');
    songContainer.innerHTML = " ";
    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";

        songDiv.innerHTML = `
        <div class="col-md-4">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-5">
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}
{/* <iframe class="w-100" src="${song.preview}" frameborder="0"></iframe> */ }

const getLyrics = (artist, title) => {
    //console.log('btn clicked');
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    //console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}


const displayLyrics = lyrics => {
    //console.log(lyrics);
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    console.log(error);
    const errorMessage = document.getElementById('text-danger');
    errorMessage.innerText = error;

}


// toggle spinner
const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('search-result');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}