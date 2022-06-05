function hiddenModalAdmin() {
    document.querySelector('.modal-login').style.display = "none";
    document.getElementById('formLog').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminAddProduct() {
    document.querySelector('.modal-admin-add-product').style.display = "none";
    document.getElementById('formAddProduct').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminAddCategory() {
    document.querySelector('.modal-admin-add-category').style.display = "none";
    document.getElementById('formAddCategory').style.transform = "translate(-50%, -300%)";
}


function hiddenModalAdminAddEmployee() {
    document.querySelector('.modal-admin-add-employee').style.display = "none";
    document.getElementById('formAddEmployee').style.transform = "translate(-50%, -245%)";
}

function showFormAdminAddProduct() {
    document.getElementById('formAddProduct').style.transform = "translate(-50%, -50%)";
    document.getElementById('formAddProduct').style.opacity = 1;
    document.querySelector('.modal-admin-add-product').style.display = "block";
}

function showFormAdminAddCategory() {
    document.getElementById('formAddCategory').style.transform = "translate(-50%, -50%)";
    document.getElementById('formAddCategory').style.opacity = 1;
    document.querySelector('.modal-admin-add-category').style.display = "block";
}

function showFormAdminAddEmployee() {
    document.getElementById('formAddEmployee').style.transform = "translate(-50%, -50%)";
    document.getElementById('formAddEmployee').style.opacity = 1;
    document.querySelector('.modal-admin-add-employee').style.display = "block";
}

function showFormLoginAdmin() {
    document.getElementById('formLog').style.transform = "translate(-50%, -50%)";
    document.getElementById('formLog').style.opacity = 1;
    document.querySelector('.modal-login').style.display = "block";
}

function hiddenNXB() {
    document.getElementById('mobile-nxb').checked = false;
}