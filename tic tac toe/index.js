let boxes = document.querySelectorAll(".gridboxes>button");
let reset = document.querySelectorAll(".reset");
let h2 = document.querySelector("h2");
let turn = true; // x's turn
let noofboxes=0;
console.log(boxes);
let winningpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    noofboxes++;
    if (turn) {
      box.style.color="blue";
      box.innerText = "X";
      console.log(`box was clicked by X ${turn}`);
    } else {
      box.innerHTML = "O";
      box.style.color="red";
      console.log(`box was clicked by O`);
    }
    turn = !turn;
    box.disabled = true;
    checkwinner();
    checkEnd();
  });
});

reset.forEach((res)=>{
    res.addEventListener("click", () => {
      console.log("This was clicked");
      boxes.forEach((box) => {
        box.innerHTML = "";
        turn = true;
        h2.innerHTML = "";
        box.disabled = false;
        noofboxes=0;
        // document.querySelector(".main").style.display = "initial"; // this was for new page
      });
      document.querySelector(".msgcontainer").style.display = "none";
    });
})

function checkwinner() {
  console.log("this was checked");
  for (let pattern of winningpatterns) {
    let box0 = boxes[pattern[0]].innerHTML;
    let box1 = boxes[pattern[1]].innerHTML;
    let box2 = boxes[pattern[2]].innerHTML;
    if (
      box0 != "" &&
      box1 != "" &&
      box2 != "" &&
      box0 == box1 &&
      box1 == box2
    ) {
      console.log(box0 + box1 + box2);
      console.log(`This is won by ${!turn}`);
      if (turn) {
        h2.style.color="red";
        h2.innerText = "O wins";
      } else {
        h2.style.color="blue";
        h2.innerText = " X wins";
      }
      boxes.forEach((box)=>{
        box.disabled=true;
      })
    //   document.querySelector(".main").style.display = "block"; // this was for new page
      document.querySelector(".msgcontainer").style.display = "flex";
      noofboxes=0;
    }
  }
}
function checkEnd(){
    console.log(noofboxes)
    if(noofboxes==9){
        h2.innerHTML="This was a draw";
        document.querySelector(".msgcontainer").style.display = "flex";
    }
}
