const input =document.querySelector("#input-box");
const listcontainer= document.querySelector("#list-container");


function addtask(){
    if(input.value==''){
        console.log("clicked no value");
        input.placeholder='Please enter your work';
    }else{
        let li=document.createElement("li");
        li.innerHTML= input.value;
        console.log(li.innerHTML);
        listcontainer.appendChild(li);
        input.value="";
        input.placeholder="Add your work";
        let span=document.createElement("span");
        span.innerHTML="\u00d7"
        li.appendChild(span);
        savedata();
    }
}

listcontainer.addEventListener("click",(e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
    }
},false);

function savedata(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function getdata(){
    listcontainer.innerHTML=localStorage.getItem("data");

}
getdata();