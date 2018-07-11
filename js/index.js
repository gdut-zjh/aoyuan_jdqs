var index = 0
var video_boxs = document.querySelectorAll('.container > div')
var box_length = video_boxs.length

/*
切换盒子函数
*/
function changeBox(step, num=-1) {
    video_boxs[index].querySelector('video').pause()
    
    if(num >= 0){
        index = num
    }else{
        if (step == 'down') {
            // 往下的时候
            index = ++index >= box_length - 1 ? box_length - 1 : index
        } else if (step == 'up') {
            // 往上的时候
            index = --index <= 0 ? 0 : index
        }
    }

    var y = -1100 * index
    document.querySelector('.container').style.webkitTransform = 'translate(0,' + y + 'px)'

    video_boxs[index].querySelector('video').play()
    // 标志已经切换完毕
    isChange = false
    
    navHighlight(index)
}

// 键盘触发后的事件
function keyHandle(event) {
    var step = ''
    if (event.key == 'ArrowDown') {
        // 往下的时候
        step = 'down'
    } else if (event.key == 'ArrowUp') {
        // 往上的时候
        step = 'up'
    }
    changeBox(step)
}

var isChange = false
// 滚轮触发后的事件
function scrollHandle(event) {
    // 火狐以外的用window.event
    var e = event || window.event
    // 火狐以外的用e.wheelDelta
    var num = e.detail == 0 ? -e.wheelDelta : e.detail

    var step = ''
    if (num > 0) {
        // 向下
        step = 'down'
    } else {
        // 向上
        step = 'up'
    }

    // 隔3秒执行盒子切换
    // 每滚动只执行一次
    if (!isChange) {
        setTimeout(function () {
            changeBox(step)
        }, 200)
        // 改变为正在切换
        isChange = true
    }
}

function changeTo(index){
    changeBox('', index)
}


function navHighlight(index){
    var li_boxs = document.querySelectorAll('.nav_content > li')
    for(var i=0;i<li_boxs.length;i++){
        if(i!==index){
            li_boxs[i].style.color = "white"
        }else{
            li_boxs[i].style.color = "#e69800"
        }
    }
}

window.addEventListener('keydown', keyHandle, true)
// 火狐
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollHandle, false)
}
// ie 谷歌
window.onmousewheel = document.onmousewheel = scrollHandle