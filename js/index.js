/**
 * Created by wsw on 2016/11/27.
 */

window.onload = function(){
    /*搜索栏*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();

}
/*搜索栏*/
function search(){
    /*
    * 1、默认位置为全透明状态，顶部固定定位  css中透明度改为0
    * 2、当页面滚动的时候动态改变盒子的透明度  onscroll 根据滚动据顶部的距离确定透明度
    * 3、当页面滚动到轮播图以下的时候，透明度变为0.85并保持不变  判断
    * */

    /*代码实现*/
    /*获取元素*/
    /*搜索盒子*/
    var searchBox = document.querySelector(".jd_header_box");
    /*轮播图盒子*/
    var bannerBox = document.querySelector(".jd_banner");
    /*获取轮播图盒子的高度*/
    var height = bannerBox.offsetHeight;

    /*页面滚动事件用window.onscroll*/
    window.onscroll = function(){
        /*获取页面滚动据顶部的距离*/
        var top = document.body.scrollTop;
        console.log(top);
        /*IE*/
        //var top = document.documentElement.scrollTop;
        var opacity = 0;
        if(top<height){
            opacity = top/height*0.85;
        }else{
            opacity = 0.85;
        }

        /*改变透明度*/
        searchBox.style.background = "rgba(201, 21, 35, "+opacity+")";
    }
}

/*轮播图*/
function banner(){
    /*
    * 需求:
    * 1、自动滚动             ---定时器+转换位移+过渡
     * 1.1、无缝滚动           ---在尾部加上第一张图片 （动画执行后 瞬间跳转）
     * 1.2、无缝滑动           ---在头部加上最后一张图片
    * 2、轮播图轮播的同时，下面对应的点也要随之变化
    * 3、轮播图的滑动效果      ---touch监听手指在x轴的移动方向让图片盒子随之改变位置。
    * 4、当手指滑动的距离不到一张图片(轮播图盒子的1/3)的1/3的时候，吸附回去    ---回到原来的定位，加过渡效果
    * 5、当超过1/3，滚动到上一张或者下一张    ---判断方向（手势左滑或者右滑）
    * */


    /*具体代码实现*/

    /*------------------1、自动滚动--------------------------------------*/
    /*获取元素*/
    /*轮播图盒子*/
    var banner = document.querySelector(".jd_banner");
    /*轮播盒子的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子ul*/
    var imgBox = banner.querySelector("ul:first-child");
    /*小圆点盒子*/
    var pointBox = banner.querySelector("ul:last-child");
    /*所有的小圆点集合*/
    var points = pointBox.querySelectorAll("li");

    /*定义一个索引值index 初始值为1 因为是第二张图片显示*/
    var index = 1;
    var timer = setInterval(function(){
        index++;
        /*计算当前盒子的定位*/
        var translateX = -index*width;

        /*设置过渡效果*/
        imgBox.style.transition = "all 0.5s linear";
        imgBox.style.webkitTransition = "all 0.5s linear";

        /*设置给当前盒子*/
        imgBox.style.transform = "translateX("+translateX+"px)";
        /*兼容移动端主流浏览器*/
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";

    },2000);

    /*--------------------------------1.1、无缝滚动-----------------------------*/
    /*最后一张图片后面添加第一张图片，滚动到最后一张图片动画结束的时候需要瞬间定位到第二张图片*/
    /*transitionEnd 也需要做兼容处理*/
    imgBox.addEventListener("transitionEnd",function(){

        if(index>=9){
            /*瞬间定位到第二张 index =1 盒子定位*/
            index = 1;
            var translateX = -index*width;
            /*取消过渡效果*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*盒子定位*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";

    /*-----------------------------1.2、无缝滑动------------------------*/
        }else if(index<=0){
            index = 8
            var translateX = -index*width;
            /*取消过渡效果*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*盒子定位*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";
        }
        setPoint();

    });

    /*transitionEnd 事件的主流浏览器兼容处理（注意大小写）*/
    imgBox.addEventListener("webkitTransitionEnd",function(){

        if(index>=9){
            /*瞬间定位到第二张 index =1 盒子定位*/
            index = 1;
            var translateX = -index*width;
            /*取消过渡效果*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*盒子定位*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";


        }else if(index<=0){
            index = 8
            var translateX = -index*width;
            /*取消过渡效果*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*盒子定位*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";
        }

        /*此时index 的索引值范围为 1---8*/
        /*调用函数，让小圆点随之改变*/
        setPoint();

    });

    /*----------------2、轮播图轮播的同时，下面对应的点也要随之变化------------------*/
    function setPoint(){
        /*首先遍历把所有的li中的now都去除  给对应的li加上*/
        for(var i =0;i<points.length;i++){
            points[i].className = "";
        }
        points[index-1].className = "now";
    }

    /*-----------------------3、轮播图的滑动效果-------------------------*/
    /*监听手指在屏幕上开始的坐标，最后离开的坐标、滑动的方向和距离*/
    /*需要绑定移动端特有的三个事件*/
    var startX = 0;    //开始的x轴坐标
    var moveX = 0;     //滑动时候的x轴坐标
    var distanceX = 0;   //滑动的距离  上两个的差值
    var isMove = false;   //判断是都滑动过  严谨处理

    imgBox.addEventListener("touchstart",function(e){
        /*手指按下的时候，清除定时轮播的定时器*/
        clearInterval(timer);
        /*可能有多个触摸点，取第一个触摸点*/
        startX = e.touches[0].clientX;

    });

    imgBox.addEventListener("touchmove",function(e){
        console.log(111);
        moveX = e.touches[0].clientX;
        /*moveX 往右滑是正值 往左滑是负值;所以distanceX的值正负不定*/
        distanceX = moveX - startX;

        /*定位盒子当前位置*/
        var translateX = - index * width + distanceX;
        /*取消过渡效果*/
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
        /*盒子定位*/
        imgBox.style.transform = "translateX("+translateX+"px)";
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";

        /*滑动触发了，ismove的值要改成true*/
        isMove = true;

    });

    /*------------------------------需求4/5----------------------------*/
    imgBox.addEventListener("touchend",function(e){
        //console.log(distanceX);
        /*判断是否滑动了*/
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                /*当滑动距离不到1/3，吸附回去*/
                var translateX = -index*width;

                /*设置过渡效果*/
                imgBox.style.transition = "all 0.5s linear";
                imgBox.style.webkitTransition = "all 0.5s linear";

                /*设置给当前盒子*/
                imgBox.style.transform = "translateX("+translateX+"px)";
                /*兼容移动端主流浏览器*/
                imgBox.style.webkitTransform = "translateX("+translateX+"px)";

            }else{
                /*超过1/3，移动到上一张或者下一张*/
                /*判断distanceX的值的正负*/
                if(distanceX>0){
                    /*大于0，向右滑 回到上一张*/
                    index--;

                }else{
                    /*小于0  向左滑  下一张*/
                    index++;
                }
                var translateX = -index*width;

                /*设置过渡效果*/
                imgBox.style.transition = "all 0.5s linear";
                imgBox.style.webkitTransition = "all 0.5s linear";

                /*设置给当前盒子*/
                imgBox.style.transform = "translateX("+translateX+"px)";
                /*兼容移动端主流浏览器*/
                imgBox.style.webkitTransform = "translateX("+translateX+"px)";

            }
        }

        /*手指离开屏幕，添加定时器，重置参数*/
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            /*计算当前盒子的定位*/
            var translateX = -index*width;

            /*设置过渡效果*/
            imgBox.style.transition = "all 0.5s linear";
            imgBox.style.webkitTransition = "all 0.5s linear";

            /*设置给当前盒子*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            /*兼容移动端主流浏览器*/
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";

        },2000);

        /*重置参数*/
        var startX = 0;    //开始的x轴坐标
        var moveX = 0;     //滑动时候的x轴坐标
        var distanceX = 0;   //滑动的距离  上两个的差值
        var isMove = false;   //判断是都滑动过  严谨处理

    });



}


function downTime(){
    /*
    * 1、倒计时，假设之间是4小时
    * 2、用定时器，每秒-1
    * 3、时间格式化，转化成时分秒塞进html的盒子中
    * */
    /*获取元素*/
    var skTime = document.querySelector(".sk_time");
    var spans = skTime.querySelectorAll("span");

    var time = 4*60*60;
    var timer = setInterval(function(){
        time --;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time<=0){
            clearInterval(timer);
        }



    },1000)




}


