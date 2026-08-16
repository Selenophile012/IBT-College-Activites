localStorage.setItem("lang" , "Am");
let select = document.getElementById("selectLang");
select.value = localStorage.getItem("lang") || "Am";
const storageLang = localStorage.getItem("lang");
select.addEventListener("change", () => {
localStorage.setItem("lang" , select.value);
})
selectLlang.innerText
   
