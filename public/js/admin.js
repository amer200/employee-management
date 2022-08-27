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