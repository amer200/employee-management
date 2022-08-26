/** add employee */
const inputsTemp = `<input type="text" class="form-control title" name="title" value=""> <input type="text" class="form-control data" name="data" value="">`;
const addEmpform = document.getElementById('add-emp-form');
const addInputs = (t) => {
    const myDiv = document.createElement('div');
    myDiv.classList = 'mb-3';
    myDiv.name = 'title';
    myDiv.innerHTML = inputsTemp;
    addEmpform.insertBefore(myDiv, t)
}