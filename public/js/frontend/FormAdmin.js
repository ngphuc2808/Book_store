function hiddenModalAdmin() {
    document.querySelector('.modal-login').style.display = "none";
    document.getElementById('formLog').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminProduct() {
    document.querySelector('.modal-admin-product').style.display = "none";
    document.getElementById('formProduct').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminAddProduct() {
    document.querySelector('.modal-admin-add-product').style.display = "none";
    document.getElementById('formAddProduct').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminEmployee() {
    document.querySelector('.modal-admin-employee').style.display = "none";
    document.getElementById('formEmployee').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminAddEmployee() {
    document.querySelector('.modal-admin-add-employee').style.display = "none";
    document.getElementById('formAddEmployee').style.transform = "translate(-50%, -245%)";
}

function hiddenModalAdminPerson() {
    document.querySelector('.modal-admin-person').style.display = "none";
    document.getElementById('formPerson').style.transform = "translate(-50%, -245%)";
}

function showFormAdminProduct() {
    document.getElementById('formProduct').style.transform = "translate(-50%, -50%)";
    document.getElementById('formProduct').style.opacity = 1;
    document.querySelector('.modal-admin-product').style.display = "block";
}

function showFormAdminEmployee() {
    document.getElementById('formEmployee').style.transform = "translate(-50%, -50%)";
    document.getElementById('formEmployee').style.opacity = 1;
    document.querySelector('.modal-admin-employee').style.display = "block";
}

function showFormAdminPerson() {
    document.getElementById('formPerson').style.transform = "translate(-50%, -50%)";
    document.getElementById('formPerson').style.opacity = 1;
    document.querySelector('.modal-admin-person').style.display = "block";
}

function showFormAdminAddProduct() {
    document.getElementById('formAddProduct').style.transform = "translate(-50%, -50%)";
    document.getElementById('formAddProduct').style.opacity = 1;
    document.querySelector('.modal-admin-add-product').style.display = "block";
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

function showFormProduct() {
    document.querySelector('.admin-person').style.display = "none";
    document.querySelector('.admin-employee').style.display = "none";
    document.querySelector('.admin-product').style.display = "block";
}

function showFormEmployee() {
    document.querySelector('.admin-product').style.display = "none";
    document.querySelector('.admin-person').style.display = "none";
    document.querySelector('.admin-employee').style.display = "block";
}

function showFormPerson() {
    document.querySelector('.admin-product').style.display = "none";
    document.querySelector('.admin-employee').style.display = "none";
    document.querySelector('.admin-person').style.display = "block";
}