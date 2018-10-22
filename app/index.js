import "./common.css";
import "./index.css";
let config = require('./config.json');
var html = require('html-withimg-loader!./index.tmpl.html');
let content = document.getElementById('title_banner_center');
let img1 = require('./img/banner_pic1.jpg');
let img2 = require('./img/banner_pic2.jpg');
let img3 = require('./img/banner_pic3.jpg');
let img4 = require('./img/banner_pic4.jpg');
let img5 = require('./img/banner_pic5.jpg');
let imgs = [img1,img2,img3,img4,img5];
let img_status = 1;
window.onload = function () {
    console.log(config.greetText);
    setInterval(changeImg, 4000);
    console.log(imgs);
}



function changeImg() {
    console.log("--------------------------------------");
    content.firstElementChild.src = imgs[img_status];
    
    content.lastElementChild.src = imgs[(img_status+1)%5];
    console.log(img_status);
    console.log((img_status+1)%5);
    img_status++;
    if (img_status == 5) {
        img_status = 0;
    }
}