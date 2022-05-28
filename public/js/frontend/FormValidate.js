function hiddenToast() {
    if(window.innerWidth <= 739)
        document.querySelector('.list-toast').style.transform = "translate(200%, -50%)";
    else
        document.querySelector('.list-toast').style.transform = "translateX(200%)";
    document.querySelector('.modal-toast').style.display = "none";
    document.querySelector('.list-toast').style.opacity = "0";
}