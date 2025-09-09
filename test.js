// 恢复 whatcanisay
let whatcanisay = [];
try {
    const saved = localStorage.getItem('whatcanisay');
    if (saved) whatcanisay = JSON.parse(saved);
} catch (e) {
    whatcanisay = [];
}

// 创建并样式化内容容器
const container = document.createElement("div");
container.style.color = "rgba(255,255,255,0.75)";
container.style.fontSize = "1.2rem";
container.style.textAlign = "center";
container.style.padding = "1rem";
container.style.width = "61.8%";
container.style.margin = "0 auto";
document.body.appendChild(container);

// 渲染 whatcanisay 列表
function showList() {
    container.innerHTML = "";
    whatcanisay.forEach((item, idx) => {
        const itemSpan = document.createElement("span");
        itemSpan.textContent = item;
        itemSpan.style.display = "inline-block";
        itemSpan.style.margin = "0.5rem 0";
        itemSpan.style.cursor = "pointer";
        itemSpan.style.width = "100%";
        itemSpan.title = "点击删除此项";
        itemSpan.onclick = () => {
            whatcanisay.splice(idx, 1);
            localStorage.setItem('whatcanisay', JSON.stringify(whatcanisay));
            showList();
        };
        container.appendChild(itemSpan);
    });
}
showList();

// 添加内容按钮
const btn = document.createElement("button");
btn.innerText = "Add content";
btn.style.margin = "1rem";
document.body.appendChild(btn);

btn.onclick = function () {
    const input = prompt("Enter content:");
    if (input) {
        whatcanisay.push(input);
        localStorage.setItem('whatcanisay', JSON.stringify(whatcanisay));
        showList();
    }
};

// 文件选择按钮样式
const mdfileInput = document.getElementById('mdfile');
const mdfileBtn = document.getElementById('mdfile-btn');
mdfileBtn.style.width = "6rem";
mdfileBtn.style.height = "6rem";
mdfileBtn.style.backgroundColor = "rgb(119, 0, 0)";
mdfileBtn.style.color = "white";
mdfileBtn.style.border = "none";
mdfileBtn.style.fontSize = "0.8rem";
mdfileBtn.style.cursor = "pointer";
mdfileBtn.onclick = () => mdfileInput.click();

// 渲染 md 内容和删除按钮
function renderMarkdown(mdText) {
    document.getElementById('markdown-content').innerHTML = marked.parse(mdText || "");
    addMdDeleteBtn();
}

// 添加 md 删除按钮
function addMdDeleteBtn() {
    let oldBtn = document.getElementById('md-delete-btn');
    if (oldBtn) oldBtn.remove();
    if (localStorage.getItem('markdown-content')) {
        const delBtn = document.createElement("button");
        delBtn.id = "md-delete-btn";
        delBtn.textContent = "Del mdfile";
        mdfileBtn.style.width = "6rem";
        mdfileBtn.style.height = "6rem";
        mdfileBtn.style.backgroundColor = "rgb(119, 0, 0)";
        mdfileBtn.style.color = "white";
        mdfileBtn.style.border = "none";
        mdfileBtn.style.fontSize = "0.8rem";
        mdfileBtn.style.cursor = "pointer";
        delBtn.onclick = function () {
            localStorage.removeItem('markdown-content');
            renderMarkdown("");
            delBtn.remove();
        };
        document.getElementById('markdown-content').after(delBtn);
    }
}

// 读取 md 文件并渲染
mdfileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
        const mdText = evt.target.result;
        localStorage.setItem('markdown-content', mdText);
        renderMarkdown(mdText);
    };
    reader.readAsText(file);
});

// 页面加载时恢复 md 内容
window.addEventListener('DOMContentLoaded', function () {
    const savedMd = localStorage.getItem('markdown-content');
    if (savedMd) renderMarkdown(savedMd);
    // 页面加载后回到顶端
    window.scrollTo(0, 0);
});
