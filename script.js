// html blocks to inject at runtime
const generateTitleHtml = (title) => {
  if (title.length <= 12)
    return `<strong><span class="text-end">${title}</span></strong>`;
  else
    return `<strong><span class="text-ellipsis">${title.slice(0, -8)}
    </span><span class="text-end">${title.slice(-8)}</span></strong>`;
};

const generateImageHtml = (src, title) => {
  return `<div class="flex-item">
                <div class="grid-item2-img"><img class="img2"
                         src=${src}
                         alt="load error"></div>
                <div class="grid-item2">${generateTitleHtml(title)}</div>
            </div>`;
};

// load data from json
const sidePanel = document.querySelector("#left-panel");
const ok = await fetch("./Untitled.txt");
const data = await ok.text();
JSON.parse(data).forEach((element) => {
  let { previewImage, title } = element;
  sidePanel.innerHTML += generateImageHtml(previewImage, title);
});

// render first image at right panel
const images = Array.from(document.querySelectorAll(".flex-item"));
const curPicture = document.querySelector("#right-panel").firstElementChild;
const curName = document.querySelector("#name-box");

const setImage = (item) => {
  let src = item.firstElementChild.firstElementChild.getAttribute("src");
  curPicture.setAttribute("src", src);
  curName.value = item.lastElementChild.textContent;
};

let curIndex = 0;
images[curIndex].classList.add("flex-item-selected");
setImage(images[curIndex]);

// adding event listeners
const len = images.length;
images.forEach((item, index) => {
  item.onclick = () => {
    images[curIndex].classList.remove("flex-item-selected");

    curIndex = index;

    images[curIndex].classList.add("flex-item-selected");
    setImage(images[curIndex]);
  };
});

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown" || event.key == "ArrowUp") {
    images[curIndex].classList.remove("flex-item-selected");

    if (event.key == "ArrowDown") curIndex = (curIndex + 1) % len;
    else curIndex = (curIndex - 1 + len) % len;

    images[curIndex].classList.add("flex-item-selected");
    setImage(images[curIndex]);
  }
});

curName.addEventListener("keydown", (event) => {
  if (event.key == "Enter") event.preventDefault();
  event.stopPropagation();
});

curName.onchange = (event) => {
  let element = images[curIndex].lastElementChild;
  element.innerHTML = generateTitleHtml(event.target.value);
};
