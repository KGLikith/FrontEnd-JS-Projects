let currentsong = new Audio();
let songs;
let prevvol=0.5;
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); // Calculate the number of minutes
  const remainingSeconds = seconds % 60; // Calculate the remaining seconds
  const formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds; // Add leading zero if necessary
  return `${minutes}:${formattedSeconds}`;
}

async function getSongs() {
  var a = await fetch("http://127.0.0.1:3000/projects/spotify/songs/");
  let responce = await a.text();
  let div = document.createElement("div");
  div.innerHTML = responce;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith("mp4")) {
      songs.push(element.href.split("/songs/")[1]);
      // songs.push(element.href.split("songs/")[1]);
    }
  }
  var songUL=document.querySelector('.librarysongs').getElementsByTagName("ul")[0];
  songUL.innerHTML="";
  console.log("displaying items");
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
            <div class="firstpart">
                <img src="music.svg" class="invert">
                <div class="info">
                <div>${song}</div>
                <div style="font-size:14px; margin-top:5px">Artist</div>
                </div>
            </div>
                <div class="playnow">
                <span>Play now</span>
                <img src="play.svg" width="30px" class="invert">
                </div>
            </li>`;
  }
  Array.from(
    document.querySelector(".librarysongs").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", () => {
      playmusic(
        e.querySelector(".firstpart").getElementsByTagName("div")[1].innerHTML
      );
    });
  });
  return songs;
}
async function playmusic(track) {
    console.log(track);
    currentsong.src = "songs/" + track;
    document.getElementById("play").src = "paused.svg";
    currentsong.play();
    currentsong.volume=prevvol;
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};
async function main() {
  songs = await getSongs();
  // let songUL = document
  //   .querySelector(".librarysongs")
  //   .getElementsByTagName("ul")[0];
  // // showing the songs in the playlist
  // songUL.innerHTML="";
  // for (const song of songs) {
  //   songUL.innerHTML =
  //     songUL.innerHTML +
  //     `<li>
  //           <div class="firstpart">
  //               <img src="music.svg" class="invert">
  //               <div class="info">
  //               <div>${song}</div>
  //               <div style="font-size:14px; margin-top:5px">Artist</div>
  //               </div>
  //           </div>
  //               <div class="playnow">
  //               <span>Play now</span>
  //               <img src="play.svg" width="30px" class="invert">
  //               </div>
  //           </li>`;
  // }
  // Attaching an eventlistener to each song
  Array.from(
    document.querySelector(".librarysongs").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", () => {
      playmusic(
        e.querySelector(".firstpart").getElementsByTagName("div")[1].innerHTML
      );
    });
  });

  

  currentsong.addEventListener("timeupdate",() => {
    // console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(
        Math.floor(currentsong.currentTime)
    )} : ${formatTime(Math.floor(currentsong.duration))}`;

    let perc = (currentsong.currentTime / currentsong.duration) * 100;
    document.querySelector(".circle").style.left= perc + '%';
    // console.log(perc);
    if(perc >= 99){
      let index=songs.indexOf(currentsong.src.split('/songs/')[1]);
      if(index+1 < songs.length){
        playmusic(songs[index+1]);
      }else{
        playmusic(songs[0]);
      }
    }
  });

  document.querySelector(".seekbar").addEventListener("click",e =>{
    if (currentsong.src == "") {
      playmusic(songs[0]);
    }
    let perc = e.offsetX/e.target.getBoundingClientRect().width* 100;
    currentsong.currentTime= currentsong.duration * perc / 100;
    console.log(currentsong.currentTime);
    document.querySelector(".circle").style.left= perc + '%';
  })

//   adding an eventlistener to menu for responsiveness
  document.querySelector(".menu").addEventListener("click",e=>{
        document.querySelector(".left").style.left="-4px";
  })
  document.querySelector(".close").addEventListener("click",e=>{
    document.querySelector(".left").style.left="-200%";
  })

  play.addEventListener("click", () => {
    if (currentsong.src == "") {
      playmusic(songs[0]);
    } else {
      if (currentsong.paused) {
        currentsong.play();
        play.src = "paused.svg";
      } else {
        currentsong.pause();
        play.src = "play.svg";
      }
    }
  });

  prev.addEventListener("click",()=>{
    let index=songs.indexOf(currentsong.src.split('/songs/')[1]);
    if(index-1 >=0){
      playmusic(songs[index-1]);
    }else{
      playmusic(songs[songs.length-1]);
    }
    
  })

  next.addEventListener("click",()=>{
    let index=songs.indexOf(currentsong.src.split('/songs/')[1]);
    if(index+1 < songs.length){
      playmusic(songs[index+1]);
    }else{
      playmusic(songs[0]);
    }wh
  })

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    currentsong.volume=e.target.value/100;
    if(currentsong.volume>0){
      document.querySelector(".songvolume>img").src="volume.svg";
    }else if(currentsong.volume == 0){
      document.querySelector(".songvolume>img").src="novol.svg";
    }
  })

  var i=0;
  Array.from(document.getElementsByClassName("card")).forEach(async e=>{
    e.addEventListener("click",async item=>{
      songs=await getSongs();
      playmusic(songs[0]);
    })
  })
  Array.from(document.getElementsByClassName("cardalb")).forEach(async e=>{
    e.addEventListener("click",async item=>{
      songs=await getSongs();
      playmusic(songs[0]);
    })
  })


  // adding a event listener to mute as soon as the volume buttton is touched
  document.querySelector(".songvolume>img").addEventListener("click",(e)=>{
    console.log(e.target.src)
    if(e.target.src.includes("volume.svg")){
      e.target.src=e.target.src.replace("volume.svg","novol.svg");
      console.log(currentsong.volume);
      prevvol=currentsong.volume;
      currentsong.volume=0;
      console.log(currentsong.volume);
      document.querySelector(".range").getElementsByTagName("input")[0].value=0;
    }else{
      e.target.src=e.target.src.replace("novol.svg","volume.svg");
      console.log(currentsong.volume);
      currentsong.volume=prevvol;
      console.log(currentsong.volume);
      document.querySelector(".range").getElementsByTagName("input")[0].value=prevvol*100;
    }
  })

}
main();

