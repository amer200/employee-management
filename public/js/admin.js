const inputsTemp = `<input type="text" class="form-control title" name="title" value="" required> <input type="text" class="form-control data" name="data" value="" required>`;
const addInputs = (t) => {
    const myDiv = document.createElement('div');
    myDiv.classList = 'mb-3';
    myDiv.name = 'title';
    myDiv.innerHTML = inputsTemp;
    const parent = t.parentNode;
    parent.insertBefore(myDiv, t)
}
const removeInputs = (t) => {
    t.parentNode.remove()
}
const changeImg = (t) => {
    const inputFile = document.getElementById('img-file');
    const empImg = document.getElementById('emp-img');
    inputFile.type = 'file';
    empImg.style = 'display: none';
    t.style = 'display: none';
}
const removeEmp = (t) => {
    const form = t.parentNode;
    if (confirm('سيتم حذف بينات الموظف نهائيا ')) {
        form.submit()
    }
}
const changeAdminPassword = () => {
    const myForm = document.getElementById('changeAdminPasswordForm');
    if (confirm('سيتم تغير كلمة مرور المسوؤل')) {
        myForm.submit()
    }
}
const changeEmpPassword = () => {
    const myForm = document.getElementById('changeEmpPasswordForm');
    if (confirm('سيتم تغير كلمة مرور الموظف')) {
        myForm.submit()
    }
}
/* qr Scanner */
function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    // alert(`Code matched = ${decodedText}`, decodedResult);
    // fetch(`/admin/edit-emp/${decodedResult}`);
    location.replace(`/admin/edit-emp/${decodedText}`);
}
function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
/* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);