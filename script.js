// html-blocks to inject at runtime
const generateImageHtml = (src, title, index) => {
  return `<div class="flex-item">
                <div class="grid-item2-img"><img class="img2"
                         src=${src}
                         alt="load error"></div>
                <div class="grid-item2-text" id="div-${index}">${title.trim()}</div>
            </div>`;
};

const titleMap = new Map(); // to store the original title
const contractTitle = (div) => {
  const title = div.innerHTML;
  titleMap.set(div.id, title);

  // both considers only-padding, when border is zero
  const excessWidth = div.scrollWidth - div.offsetWidth;
  if (excessWidth > 0) {
    const len = Math.floor((title.length - excessWidth / 20) / 2);
    let [title1, title2, flag] = [
      title.slice(0, len),
      title.slice(-len + 1),
      true,
    ];
    while (div.scrollWidth > div.offsetWidth) {
      if (flag) title1 = title1.slice(0, -1);
      else title2 = title2.slice(1);

      div.innerHTML = `${title1}...${title2}`;
      flag = !flag;
    }
  }
};

// load data from json
const sidePanel = document.querySelector("#left-panel");
const ok = await fetch("./Untitled.txt");
const data = await ok.text();
let index = 0;
JSON.parse(data).forEach((element) => {
  let { previewImage, title } = element;
  sidePanel.innerHTML += generateImageHtml(previewImage, title, index);
  contractTitle(document.querySelector(`#div-${index++}`));
});

// render first image at right panel
const images = Array.from(document.querySelectorAll(".flex-item"));
const curPicture = document.querySelector("#right-panel").firstElementChild;
const curName = document.querySelector("#name-box");

const setImage = (item) => {
  let src = item.firstElementChild.firstElementChild.getAttribute("src");
  curPicture.setAttribute("src", src);
  curName.value = titleMap.get(item.lastElementChild.id);
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
  element.innerHTML = event.target.value;
  contractTitle(element);
};
