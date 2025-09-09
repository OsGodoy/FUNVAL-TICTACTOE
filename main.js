let cuadro1 = document.querySelector(".cuadro1")
let cuadro2 = document.querySelector(".cuadro2")
let x = document.querySelectorAll(".uno")
let o = document.querySelectorAll(".dos")

let turno = true

cuadro1.addEventListener("click",function(){
    if (turno === true){
        x.classList.replace("hidden","flex")
    }else{
        o.classList.replace("hidden","flex")
    }
})

cuadro2.addEventListener("click",function(){
    if (turno === true){
        x.classList.replace("hidden","flex")
    }else{
        o.classList.replace("hidden","flex")
    }
})