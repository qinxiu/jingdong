/**
 * Created by wsw on 2016/11/27.
 */

window.onload = function(){
    /*������*/
    search();
    /*�ֲ�ͼ*/
    banner();
    /*����ʱ*/
    downTime();

}
/*������*/
function search(){
    /*
    * 1��Ĭ��λ��Ϊȫ͸��״̬�������̶���λ  css��͸���ȸ�Ϊ0
    * 2����ҳ�������ʱ��̬�ı���ӵ�͸����  onscroll ���ݹ����ݶ����ľ���ȷ��͸����
    * 3����ҳ��������ֲ�ͼ���µ�ʱ��͸���ȱ�Ϊ0.85�����ֲ���  �ж�
    * */

    /*����ʵ��*/
    /*��ȡԪ��*/
    /*��������*/
    var searchBox = document.querySelector(".jd_header_box");
    /*�ֲ�ͼ����*/
    var bannerBox = document.querySelector(".jd_banner");
    /*��ȡ�ֲ�ͼ���ӵĸ߶�*/
    var height = bannerBox.offsetHeight;

    /*ҳ������¼���window.onscroll*/
    window.onscroll = function(){
        /*��ȡҳ������ݶ����ľ���*/
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

        /*�ı�͸����*/
        searchBox.style.background = "rgba(201, 21, 35, "+opacity+")";
    }
}

/*�ֲ�ͼ*/
function banner(){
    /*
    * ����:
    * 1���Զ�����             ---��ʱ��+ת��λ��+����
     * 1.1���޷����           ---��β�����ϵ�һ��ͼƬ ������ִ�к� ˲����ת��
     * 1.2���޷컬��           ---��ͷ���������һ��ͼƬ
    * 2���ֲ�ͼ�ֲ���ͬʱ�������Ӧ�ĵ�ҲҪ��֮�仯
    * 3���ֲ�ͼ�Ļ���Ч��      ---touch������ָ��x����ƶ�������ͼƬ������֮�ı�λ�á�
    * 4������ָ�����ľ��벻��һ��ͼƬ(�ֲ�ͼ���ӵ�1/3)��1/3��ʱ��������ȥ    ---�ص�ԭ���Ķ�λ���ӹ���Ч��
    * 5��������1/3����������һ�Ż�����һ��    ---�жϷ��������󻬻����һ���
    * */


    /*�������ʵ��*/

    /*------------------1���Զ�����--------------------------------------*/
    /*��ȡԪ��*/
    /*�ֲ�ͼ����*/
    var banner = document.querySelector(".jd_banner");
    /*�ֲ����ӵĿ��*/
    var width = banner.offsetWidth;
    /*ͼƬ����ul*/
    var imgBox = banner.querySelector("ul:first-child");
    /*СԲ�����*/
    var pointBox = banner.querySelector("ul:last-child");
    /*���е�СԲ�㼯��*/
    var points = pointBox.querySelectorAll("li");

    /*����һ������ֵindex ��ʼֵΪ1 ��Ϊ�ǵڶ���ͼƬ��ʾ*/
    var index = 1;
    var timer = setInterval(function(){
        index++;
        /*���㵱ǰ���ӵĶ�λ*/
        var translateX = -index*width;

        /*���ù���Ч��*/
        imgBox.style.transition = "all 0.5s linear";
        imgBox.style.webkitTransition = "all 0.5s linear";

        /*���ø���ǰ����*/
        imgBox.style.transform = "translateX("+translateX+"px)";
        /*�����ƶ������������*/
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";

    },2000);

    /*--------------------------------1.1���޷����-----------------------------*/
    /*���һ��ͼƬ������ӵ�һ��ͼƬ�����������һ��ͼƬ����������ʱ����Ҫ˲�䶨λ���ڶ���ͼƬ*/
    /*transitionEnd Ҳ��Ҫ�����ݴ���*/
    imgBox.addEventListener("transitionEnd",function(){

        if(index>=9){
            /*˲�䶨λ���ڶ��� index =1 ���Ӷ�λ*/
            index = 1;
            var translateX = -index*width;
            /*ȡ������Ч��*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*���Ӷ�λ*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";

    /*-----------------------------1.2���޷컬��------------------------*/
        }else if(index<=0){
            index = 8
            var translateX = -index*width;
            /*ȡ������Ч��*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*���Ӷ�λ*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";
        }
        setPoint();

    });

    /*transitionEnd �¼���������������ݴ���ע���Сд��*/
    imgBox.addEventListener("webkitTransitionEnd",function(){

        if(index>=9){
            /*˲�䶨λ���ڶ��� index =1 ���Ӷ�λ*/
            index = 1;
            var translateX = -index*width;
            /*ȡ������Ч��*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*���Ӷ�λ*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";


        }else if(index<=0){
            index = 8
            var translateX = -index*width;
            /*ȡ������Ч��*/
            imgBox.style.transition = "none";
            imgBox.style.webkitTransition = "none";
            /*���Ӷ�λ*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";
        }

        /*��ʱindex ������ֵ��ΧΪ 1---8*/
        /*���ú�������СԲ����֮�ı�*/
        setPoint();

    });

    /*----------------2���ֲ�ͼ�ֲ���ͬʱ�������Ӧ�ĵ�ҲҪ��֮�仯------------------*/
    function setPoint(){
        /*���ȱ��������е�li�е�now��ȥ��  ����Ӧ��li����*/
        for(var i =0;i<points.length;i++){
            points[i].className = "";
        }
        points[index-1].className = "now";
    }

    /*-----------------------3���ֲ�ͼ�Ļ���Ч��-------------------------*/
    /*������ָ����Ļ�Ͽ�ʼ�����꣬����뿪�����ꡢ�����ķ���;���*/
    /*��Ҫ���ƶ������е������¼�*/
    var startX = 0;    //��ʼ��x������
    var moveX = 0;     //����ʱ���x������
    var distanceX = 0;   //�����ľ���  �������Ĳ�ֵ
    var isMove = false;   //�ж��Ƕ�������  �Ͻ�����

    imgBox.addEventListener("touchstart",function(e){
        /*��ָ���µ�ʱ�������ʱ�ֲ��Ķ�ʱ��*/
        clearInterval(timer);
        /*�����ж�������㣬ȡ��һ��������*/
        startX = e.touches[0].clientX;

    });

    imgBox.addEventListener("touchmove",function(e){
        console.log(111);
        moveX = e.touches[0].clientX;
        /*moveX ���һ�����ֵ �����Ǹ�ֵ;����distanceX��ֵ��������*/
        distanceX = moveX - startX;

        /*��λ���ӵ�ǰλ��*/
        var translateX = - index * width + distanceX;
        /*ȡ������Ч��*/
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
        /*���Ӷ�λ*/
        imgBox.style.transform = "translateX("+translateX+"px)";
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";

        /*���������ˣ�ismove��ֵҪ�ĳ�true*/
        isMove = true;

    });

    /*------------------------------����4/5----------------------------*/
    imgBox.addEventListener("touchend",function(e){
        //console.log(distanceX);
        /*�ж��Ƿ񻬶���*/
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                /*���������벻��1/3��������ȥ*/
                var translateX = -index*width;

                /*���ù���Ч��*/
                imgBox.style.transition = "all 0.5s linear";
                imgBox.style.webkitTransition = "all 0.5s linear";

                /*���ø���ǰ����*/
                imgBox.style.transform = "translateX("+translateX+"px)";
                /*�����ƶ������������*/
                imgBox.style.webkitTransform = "translateX("+translateX+"px)";

            }else{
                /*����1/3���ƶ�����һ�Ż�����һ��*/
                /*�ж�distanceX��ֵ������*/
                if(distanceX>0){
                    /*����0�����һ� �ص���һ��*/
                    index--;

                }else{
                    /*С��0  ����  ��һ��*/
                    index++;
                }
                var translateX = -index*width;

                /*���ù���Ч��*/
                imgBox.style.transition = "all 0.5s linear";
                imgBox.style.webkitTransition = "all 0.5s linear";

                /*���ø���ǰ����*/
                imgBox.style.transform = "translateX("+translateX+"px)";
                /*�����ƶ������������*/
                imgBox.style.webkitTransform = "translateX("+translateX+"px)";

            }
        }

        /*��ָ�뿪��Ļ����Ӷ�ʱ�������ò���*/
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            /*���㵱ǰ���ӵĶ�λ*/
            var translateX = -index*width;

            /*���ù���Ч��*/
            imgBox.style.transition = "all 0.5s linear";
            imgBox.style.webkitTransition = "all 0.5s linear";

            /*���ø���ǰ����*/
            imgBox.style.transform = "translateX("+translateX+"px)";
            /*�����ƶ������������*/
            imgBox.style.webkitTransform = "translateX("+translateX+"px)";

        },2000);

        /*���ò���*/
        var startX = 0;    //��ʼ��x������
        var moveX = 0;     //����ʱ���x������
        var distanceX = 0;   //�����ľ���  �������Ĳ�ֵ
        var isMove = false;   //�ж��Ƕ�������  �Ͻ�����

    });



}


function downTime(){
    /*
    * 1������ʱ������֮����4Сʱ
    * 2���ö�ʱ����ÿ��-1
    * 3��ʱ���ʽ����ת����ʱ��������html�ĺ�����
    * */
    /*��ȡԪ��*/
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


