const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

/*캔버스를 사용하는 윈도우가 얼마나 큰지 알려주기위한 값,
이걸 알려줘야 그림이 나옴*/
canvas.width = 700;
canvas.height = 700;

//기본 첫번째 색상을 검정색으로 지정함.//
ctx.strokeStyle = "#2c2c2c";
//선의 기본 두께를 지정함.//
ctx.lineWidth = 2.5;

//기본적으로 painting의 값은 false임//
let painting = false;

function stopPainting(){
    /*기본 값이 false로 함수를 만들어서
    코드(painting = false)가 반복되는 것을 방지함.*/
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //켄버스위에 마우스 움직임을 감지함.//
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //마우스의 경로를 추적하는 함수, 마우스를 움직이는 내내 작동함.//
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //캔버스에 선을 그리는 함수.//
        ctx.lineTo(x, y);
        ctx.stroke()
    }
    
}

function onMouseDown(event){
    //마우스 클릭시 값은 true로 변함.//
    painting = true;
}


if(canvas){
    //캔버스 위에 마우스 움직임을 감지하게 하는 함수 호출//
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}