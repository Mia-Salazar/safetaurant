const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

const content2 = document.getElementById("content2");
const content3 = document.getElementById("content3");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

nextButton.addEventListener("click", nextStep, false);
previousButton.addEventListener("click", previousStep, false);

let currentStep = 1;

function nextStep(event){
    event.preventDefault();
    const nextStepNumber= currentStep + 1;
    previousButton.classList.remove("hidden");
    document.getElementById(`content${nextStepNumber}`).classList.remove("hidden");
    document.getElementById(`content${currentStep}`).classList.add("hidden");
    
    // Change steps design
    document.getElementById(`step${currentStep}`).classList.add("step__item--done-before")
    document.getElementById(`step${nextStepNumber}`).classList.add("step__item--done")
    document.getElementById(`step${nextStepNumber}`).classList.add("step__item--done-after")
    
    currentStep++;
    if (currentStep === 3) {
        nextButton.classList.add("hidden"); 
        document.getElementById("content4").classList.remove("hidden");
    }
}

function previousStep(event){
    event.preventDefault();
    const previousStepNumber= currentStep - 1;
    nextButton.classList.remove("hidden");

    document.getElementById(`content${previousStepNumber}`).classList.remove("hidden");
    document.getElementById(`content${currentStep}`).classList.add("hidden");
    
    //Change steps design
    document.getElementById(`step${currentStep}`).classList.remove("step__item--done-after")
    document.getElementById(`step${previousStepNumber}`).classList.remove("step__item--done-before")
    document.getElementById(`step${currentStep}`).classList.remove("step__item--done")
    
    currentStep--;
    if (currentStep === 1) {
        previousButton.classList.add("hidden");
    }
}