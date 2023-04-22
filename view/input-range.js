const rangeInputs = document.querySelectorAll('.range-input')
const numberInput = document.querySelector('.range-number')

const changeInputRangeBackground = (input, value) => {
  const min = input.min;
  const max = input.max;
  input.style.backgroundSize = calculateInputRange(value, min, max);
}

const calculateInputRange = (val, min, max) => {
  const result = (val - min) * 100 / (max - min);
  const hasPositiveValue = result > 0 ? result : 0;
  return hasPositiveValue + '% 100%';
}

function handleInputChange(e) {
  let target = e.target 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = calculateInputRange(val, min, max);
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)