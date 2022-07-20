function darkmode(){
    var body = document.body;
    body.classList.toggle("dark-mode");
    var x = localStorage.getItem('dark-mode');
    x = Math.abs(x-1);
    localStorage.setItem("dark-mode", x);
};

const darkModeSwitch = document.getElementById("dark-mode-switch");
darkModeSwitch.addEventListener("click", darkmode);

document.addEventListener('onload', readDarkModeStorage());
function readDarkModeStorage(){
    var x = localStorage.getItem('dark-mode');
    if(x == null){
        localStorage.setItem("dark-mode", 0);
    }else{
        if(x == 1){
            var body = document.body;
            body.classList.toggle("dark-mode");
        }
    }
};
