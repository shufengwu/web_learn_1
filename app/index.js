import "./common.css";
import "./index.css";
import "./jquery.js";
let config = require('./config.json');
var html = require('html-withimg-loader!./index.tmpl.html');
// let content = document.getElementById('title_banner_center');
let content = $("#title_banner_center");
let img1 = require('./img/banner_pic1.jpg');
let img2 = require('./img/banner_pic2.jpg');
let img3 = require('./img/banner_pic3.jpg');
let img4 = require('./img/banner_pic4.jpg');
let img5 = require('./img/banner_pic5.jpg');
let imgs = [img1,img2,img3,img4,img5];
let img_status = 1;
let banner_status = 1;
let start;
window.onload = function () {
    console.log(config.greetText);
    //$("#news_banner>div:first-child>ul").animate({left:'554px'});
    setInterval(changeImg, 4000);
    start = setInterval(changeBannerImage, 5000);
    console.log(imgs);
    $("#notice").text("hahahahaha");
    
}

$("#news_banner>div:first-child").mouseover(function () { 
    clearInterval(start);
});

$("#news_banner>div:first-child").mouseout(function () { 
    start = setInterval(changeBannerImage, 5000);
});

function changeImg() {
    console.log("--------------------------------------");
    $("#title_banner_center img:first-child").attr("src",imgs[img_status]);
    $("#title_banner_center img:last-child").attr("src", imgs[(img_status+1)%5]);

    console.log(img_status);
    console.log((img_status+1)%5);
    img_status++;
    if (img_status == 5) {
        img_status = 0;
    }
}

function changeBannerImage(){
    
    
    // if(banner_status==0){
    //     $("#news_banner>div:first-child>ul").animate({left:(-554*(banner_status+1))+'px'});
    // }else if(banner_status==1){
    //     $("#news_banner>div:first-child>ul").animate({left:'-1108px'});
    // }else if(banner_status==2){
    //     $("#news_banner>div:first-child>ul").animate({left:'-1662px'});
    // }else if(banner_status==3){
    //     $("#news_banner>div:first-child>ul").animate({left:'-2216px'});
    // }else if(banner_status==4){
    //     $("#news_banner>div:first-child>ul").animate({left:'-2770px'});
        
    // }
    let position = (-554*(banner_status+1))+'px';
    $("#news_banner>div:first-child>ul").animate({left:position},500);
    banner_status++;
    if(banner_status==5){
        $("#news_banner>div:first-child>ul").animate({left:'0px'},0);
        // $("#news_banner>div:first-child>ul").attr({
        //     style : "position: absolute;height: 290px;width: 3878px;left: 0px;"
        // });
        //$("#news_banner>div:first-child>ul").offset({left:'0px'});
        banner_status=0;
    }
}