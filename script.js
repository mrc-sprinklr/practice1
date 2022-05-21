// load data from json
const sidePanel = document.querySelector("#left-panel");
const ok = await fetch("./Untitled.txt");
const data = await ok.text();
JSON.parse(data).forEach((element) => {
  let { previewImage, title } = element;
  sidePanel.innerHTML += `<div class="flex-item">
                <div class="grid-item2"><img class="img2"
                         src=${previewImage}
                         alt="load error"></div>
                <div class="grid-item2-text"><strong>${title}</strong></div>
            </div>`;
});

// render first imgae
const images = Array.from(document.querySelectorAll(".flex-item"));
const curPicture = document.querySelector("#right-panel").firstElementChild;
const curName = document.querySelector("#name-box");

const setImage = (item) => {
  let src = item.firstElementChild.firstElementChild.getAttribute("src");
  curPicture.setAttribute("src", src);
  curName.value = item.lastElementChild.textContent;
};

let curIndex = 0;
images[curIndex].style.backgroundColor = "dodgerblue";
images[curIndex].style.color = "white";
setImage(images[curIndex]);

// adding event listeners
let len = images.length;
images.forEach((item, index) => {
  item.onclick = () => {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = index;
    item.style.backgroundColor = "dodgerblue";
    item.style.color = "white";
    setImage(item);
  };
});

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown") {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = (curIndex + 1) % len;
    images[curIndex].style.backgroundColor = "dodgerblue";
    images[curIndex].style.color = "white";
    setImage(images[curIndex]);
  } else if (event.key == "ArrowUp") {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = (curIndex - 1 + len) % len;
    images[curIndex].style.backgroundColor = "dodgerblue";
    images[curIndex].style.color = "white";
    setImage(images[curIndex]);
  }
});

curName.addEventListener("keydown", (event) => {
  if (event.key == "Enter") event.preventDefault();
  event.stopPropagation();
});

curName.onchange = (event) => {
  images[
    curIndex
  ].lastElementChild.innerHTML = `<strong>${event.target.value}</strong>`;
};
