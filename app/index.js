import "./common.css";
import "./index.css";
let config = require('./config.json');
var html = require('html-withimg-loader!./index.tmpl.html');
let content = document.getElementById('title_banner_center');
let imgs = ["url('./img/banner_pic1.jpg')", "url('./img/banner_pic2.jpg')", "url('./img/banner_pic3.jpg')", "url('./img/banner_pic4.jpg')", "url('./img/banner_pic5.jpg')"];
let img_status = 0;
window.onload = function () {
    console.log(config.greetText);
    setInterval(changeImg(), 3000);
    //console.log(index_style);

    //document.getElementById("div1").classList.add("div1");
}



function changeImg() {
    console.log("--------------------------------------");
    
    content.style.background = imgs[img_status];
    img_status++;
    if (img_status == 5) {
        img_status = 0;
    }
}