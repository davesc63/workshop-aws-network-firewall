function copyText(el){
    var textArea = document.createElement("textarea");
    textArea.value = el.childNodes[0].textContent
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    textArea.remove();
    el.childNodes[1].textContent = "Copied!"
}

function resetToolTip(el){
    el.childNodes[1].textContent = "Click to copy"
}