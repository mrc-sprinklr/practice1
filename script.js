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
                <div class="grid-item2-text">${title}</div>
            </div>`;
});

// render first imgae
const images = Array.from(document.querySelectorAll(".flex-item"));
const curPicture = document.querySelector("#right-panel").firstElementChild;

const setImage = (item) => {
  let src = item.firstElementChild.firstElementChild.getAttribute("src");
  curPicture.setAttribute("src", src);
};

let curIndex = 0;
images[curIndex].style.backgroundColor = "blue";
images[curIndex].style.color = "white";
setImage(images[curIndex]);

// adding event listeners
let len = images.length;
images.forEach((item, index) => {
  item.onclick = () => {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = index;
    item.style.backgroundColor = "blue";
    item.style.color = "white";
    setImage(item);
  };
});

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown") {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = (curIndex + 1) % len;
    images[curIndex].style.backgroundColor = "blue";
    images[curIndex].style.color = "white";
    setImage(images[curIndex]);
  } else if (event.key == "ArrowUp") {
    images[curIndex].style.backgroundColor = "white";
    images[curIndex].style.color = "black";

    curIndex = (curIndex - 1 + len) % len;
    images[curIndex].style.backgroundColor = "blue";
    images[curIndex].style.color = "white";
    setImage(images[curIndex]);
  }
});
