var whatcanisay = [];
if (localStorage.getItem('whatcanisay')) {
    try {
        whatcanisay = JSON.parse(localStorage.getItem('whatcanisay'));
    } catch (e) {
        whatcanisay = [];
    }
}

var container = document.createElement("div");
container.style.color = "rgba(255,255,255,0.75)";
container.style.fontSize="1.2rem";
container.style.textAlign="center";
container.style.padding="1rem";
container.style.width="61.8%";
document.body.appendChild(container);

function showList() {
    container.innerHTML = "";
    for (let i = 0; i < whatcanisay.length; i++) {
        container.innerHTML += whatcanisay[i] + "<br>";
    }
}
showList();

var btn = document.createElement("button");
btn.innerText = "Add Content";
document.body.appendChild(btn);

btn.addEventListener("click", function() {
    var input = prompt("Enter Content:");
    if (input) {
        whatcanisay.push(input);
        // 保存到 localStorage
        localStorage.setItem('whatcanisay', JSON.stringify(whatcanisay));
        showList();
    }
});

document.getElementById('mdfile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('markdown-content').innerHTML = marked.parse(evt.target.result);
    };
    reader.readAsText(file);
});

window.addEventListener('DOMContentLoaded', function() {
    const savedMd = localStorage.getItem('markdown-content');
    if (savedMd) {
        document.getElementById('markdown-content').innerHTML = marked.parse(savedMd);
    }
});

document.getElementById('mdfile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const mdText = evt.target.result;
        document.getElementById('markdown-content').innerHTML = marked.parse(mdText);
        localStorage.setItem('markdown-content', mdText);
    };
    reader.readAsText(file);
});

var mdfileInput = document.getElementById('mdfile');
var mdfileBtn = document.getElementById('mdfile-btn');
mdfileBtn.style.width = "6rem";
mdfileBtn.style.height = "6rem";
mdfileBtn.style.backgroundColor = "rgb(119, 0, 0)";
mdfileBtn.style.color = "white";
mdfileBtn.style.border = "none";
mdfileBtn.style.fontSize = "0.8rem";
mdfileBtn.style.cursor = "pointer";
mdfileBtn.addEventListener('click', function() {
    mdfileInput.click();
});