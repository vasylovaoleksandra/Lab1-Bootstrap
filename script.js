
const themeButton=document.getElementById("themeButton");
const booking=document.getElementById("booking");
const form=document.getElementById("bookingForm");
const trainingType=document.getElementById("trainingType");
const membership=document.getElementById("membership");
const toast=new bootstrap.Toast(document.getElementById("successToast"));

// Перемикання теми
themeButton.addEventListener("click",()=>{
    const html=document.documentElement;
    if(html.getAttribute("data-bs-theme")==="dark"){
        html.setAttribute("data-bs-theme","light");
        themeButton.innerHTML='<i class="bi bi-moon"></i>';
    }else{
        html.setAttribute("data-bs-theme","dark");
        themeButton.innerHTML='<i class="bi bi-sun"></i>';
    }
});

// Автоматичний вибір тренування або абонемента
booking.addEventListener("show.bs.modal",event=>{
    form.reset();
    form.classList.remove("was-validated");
    const button=event.relatedTarget;
    if(button?.dataset.training){
        trainingType.value=button.dataset.training;
    }
    const card=button?.closest("#prices .card");
    if(card){
        membership.value=card.querySelector("h4").textContent;
    }
});

// Перевірка форми запису
form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.checkValidity()){
        form.classList.add("was-validated");
        return;
    }
    bootstrap.Modal.getInstance(booking).hide();
    toast.show();
    form.reset();
    form.classList.remove("was-validated");
});
