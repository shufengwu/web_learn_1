import "./common.css";
import "./index.css";
import "./jquery.js";
let config = require('./config.json');
var html = require('html-withimg-loader!./index.tmpl.html');
let content = $("#title_banner_center");
let img1 = require('./img/banner_pic1.jpg');
let img2 = require('./img/banner_pic2.jpg');
let img3 = require('./img/banner_pic3.jpg');
let img4 = require('./img/banner_pic4.jpg');
let img5 = require('./img/banner_pic5.jpg');
//banner图片
let imgs = [img1, img2, img3, img4, img5];
let start;
let start_column;
//banner图片说明文字
let banner_text = [config.banner_text1, config.banner_text2, config.banner_text3, config.banner_text4, config.banner_text5];
let img_status = 1;
let banner_status = 1;
let banner_column_status = 3;

window.onload = function () {
    console.log(config.greetText);
    setTimeout(changeImg, 4000);
    start = setInterval(changeBannerImage, 5000);
    start_column = setInterval(changeColumnBannerImage, 3000);
    setBannerDot();
    setBannerDotClickEvent();
    setColumnArrowClickEvent();
    if (document.addEventListener) {
        //监听窗口是否可见
        document.addEventListener('webkitvisibilitychange', function () {
            console.log(document.webkitVisibilityState);
            
            if (document.webkitVisibilityState == "visible") {
                start = setInterval(changeBannerImage, 5000);
                start_column = setInterval(changeColumnBannerImage, 3000);
            } else {
                clearInterval(start);
                clearInterval(start_column);
            }
        });
    }
}

//更改title栏的风景图图片
function changeImg() {

    //淡出切换图片
    $("#title_banner_center img:last-child").fadeOut(1000, function () {
        console.log(img_status);
        $("#title_banner_center img:last-child").attr("src", imgs[img_status]);
        $("#title_banner_center img:last-child").fadeIn(0);
        $("#title_banner_center img:first-child").attr("src", imgs[(img_status + 1) % imgs.length]);
        img_status++;
        if (img_status === imgs.length) {
            img_status = 0;
        }
        setTimeout(changeImg, 4000);
    });

}

/**
 * 更改news轮播图的image
 */
function changeBannerImage() {
    //下个显示位置
    let position = (-config.news_banner_step * (banner_status + 1)) + 'px';
    //平移到下个位置
    $("#news_banner>div:first-child>ul:first-child").animate({
        left: position
    }, 500);
    banner_status++;
    if (banner_status === 5) {
        //如果切换到第1张图前面的那张图
        $("#news_banner>div:first-child>ul:first-child").animate({
            left: '0px'
        }, 0);
        banner_status = 0;
    }
    //设置news轮播图的点的状态
    setBannerDot();
    //设置news轮播图底部文字
    setBannerText((banner_status + 4) % 5);
}

/**
 * 更改专栏轮播图图片
 */
function changeColumnBannerImage() {
    let position = (-config.colomn_banner_step * (banner_column_status + 1)) + 'px';
    $("#column_marquee>ul").animate({
        left: position
    }, 500);
    banner_column_status++;
    if (banner_column_status === 8) {
        $("#column_marquee>ul").animate({
            left: '-876px'
        }, 0);
        banner_column_status = 3;
    }
}

/**
 * 更改专栏轮播图图片(反向)
 */

function changeColumnBannerImageReverse() {
    let position = (-config.colomn_banner_step * (banner_column_status - 1)) + 'px';
    $("#column_marquee>ul").animate({
        left: position
    }, 500);
    banner_column_status--;
    if (banner_column_status === 0) {
        $("#column_marquee>ul").animate({
            left: '-1460px'
        }, 0);
        banner_column_status = 5;
    }
}

/**
 * 设置news轮播图的点的状态
 */
function setBannerDot() {
    $("#news_banner>div:first-child>ul:last-child>li").each(function (index, element) {
        //选中状态
        if ((index + 1) % 5 === banner_status) {
            $(element).css("color", "#000000");
            $(element).css("border-color", "rgb(255,0,0)");
            $(element).css("background-color", "rgb(204,0,0)");
            //未选中状态
        } else {
            $(element).css("color", "rgb(204,204,204)");
            $(element).css("border-color", "rgb(153,153,153)");
            $(element).css("background-color", "rgb(102,102,102)");
        }
    });
}

/**
 * 设置news轮播图的点的点击事件
 */
function setBannerDotClickEvent() {

    $("#news_banner>div:first-child>ul:last-child").on("click", "li", function () {
        clearInterval(start);
        banner_status = $(this).index();
        changeBannerImage();
        start = setInterval(changeBannerImage, 5000);
    });
}

/**
 * 设置专栏轮播图的箭头的点击事件
 */
function setColumnArrowClickEvent() {

    $("#column_left_arrow").click(function (e) {
        e.preventDefault();
        clearInterval(start_column);
        changeColumnBannerImageReverse();
        start_column = setInterval(changeColumnBannerImage, 3000);

    });

    $("#column_right_arrow").click(function (e) {
        e.preventDefault();
        clearInterval(start_column);
        changeColumnBannerImage();
        start_column = setInterval(changeColumnBannerImage, 3000);

    });
}

/**
 * 设置news轮播图底部文字
 * @param {*} index 
 */
function setBannerText(index) {
    $("#news_banner>div:last-child").text(banner_text[index]);
}