const mainPriceInput = document.getElementById('main-price');
const quantInput = document.getElementById('quant-input');
const cityInput = document.getElementById('city-input');
const price = document.getElementById('price');
const deliverPrice = document.getElementById('deliver-price');
const totalPrice = document.getElementById('total-price');

cityInput.addEventListener('change', () => {
    deliverPrice.innerHTML = `${cityInput.value.split('/')[0]}دج`
})
quantInput.addEventListener('change', () => {
    price.innerHTML = quantInput.value;
    totalPrice.innerHTML = quantInput.value * mainPriceInput.value + +cityInput.value.split('/')[0] + 'دج';
})
cityInput.addEventListener('change', () => {
    totalPrice.innerHTML = quantInput.value * mainPriceInput.value + +cityInput.value.split('/')[0] + 'دج';
})
