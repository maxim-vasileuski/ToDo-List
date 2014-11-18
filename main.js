(function(){

    var submit = document.getElementById('submit'),
        inputs = document.getElementsByTagName('input'),
        content = document.getElementById('content'),
        deletes,
        topAbs;
        
    submit.addEventListener('click', add, false);
    
    function add(){
        
        //проверка данных
        if (!inputs[0].value || !inputs[1].value || !inputs[2].value) {
            alert('Input your info into all fields');
            return;
        }
        if ( !/^\d+$/gim.test(inputs[1].value) ) {
            alert('Input some NUMBERS into second field');
            return;  
        }
        if ( !/^\d\d?[.\-]\d\d?[.\-]\d\d\d?\d?$/gim.test(inputs[2].value) ){
            alert('Input DATE into third field');
            return;
        }
        
        
        
        // добавление элемента
        var div = document.createElement('div'),
            inners = [];
        
        var el = document.getElementsByClassName('post'),
            arr=[];
        for(var i=0; i<el.length;i++){
            arr.push(el[i]);
        }
        arr.sort(compare);
        
    
        div.classList.add('post');
        
        for(var i=0; i<5; i++){
            inners.push(document.createElement('p'));
        }
        
        inners[0].classList.add('num');
        inners[4].classList.add('delete');
        
        inners[1].innerHTML = inputs[0].value + '';
        inners[2].innerHTML = inputs[1].value + '';
        inners[3].innerHTML = inputs[2].value + '';
        inners[4].innerHTML = 'Delete';

        for(var i=0; i<inners.length; i++){
            inners[i].classList.add('indiv');
            div.appendChild(inners[i]);
        }
        
        content.appendChild(div);
        
        var t = arr.length-1;
        if(arr[t]) {
            var prev = +window.getComputedStyle(arr[t], '').top.match(/\d+/)[0];
            div.style.top = (prev+50)+'px';
            inners[0].innerHTML = (t+2)+'';
        } else {
            div.style.top = '0px';
            inners[0].innerHTML = '1';
        }
        
        inputs[0].value = inputs[1].value = inputs[2].value = null;
    }
    

    
    content.addEventListener('click', del, false);
    
    function del(e){
        var target = e.target;
        
        while(target !=content){
            if(target.classList.contains('delete')){
                target.parentNode.style.left = "100%";
                setTimeout(function(){
                    target.parentNode.parentNode.removeChild(target.parentNode);
                    fixPosition();
                },300);
                return;
            }
            target = target.parentNode;
        }
    }
    

    content.addEventListener('mousedown', checkY, false);
    content.addEventListener('mousemove', drag, false);
    content.addEventListener('mouseup', drop, false);
    content.ondragstart = function() {
        return false;
    }
    
    var dragObject = {},
        size,
        bull=1;
    
    function checkY(e){
        bull = 1;
        var target = e.target;
        while(target != content){
            if(target.classList.contains('post')){
                dragObject.elem = target;
                dragObject.downY = e.pageY;
                dragObject.elem.style.zIndex='100';
                dragObject.elem.style.transition='none';
                dragObject.elem.style.WebkitTransition='none';
            }
            target = target.parentNode;
        }
    }
    
    function drag(e){
        if (!dragObject.elem) return;
        if(bull){
            size = content.getBoundingClientRect();
            var moveY = e.pageY - dragObject.downY;
            if (Math.abs(moveY) < 3 ) {
                return;
            }
            dragObject.elem.style.top = (e.pageY - size.top - 25) + 'px';
        }
    }
    
    function drop(e){
        if (!dragObject.elem) return;
        dragObject.elem.style.transition='all .3s ease';
        dragObject.elem.style.WebkitTransition='all .3s ease';
        dragObject.elem.style.top = (e.pageY - size.top - 25) + 'px';
        bull = 0;
        delete dragObject.elem;
        fixPosition();
        dragObject.elem.style.zIndex='0';
    }
    
    
    
    //проверка и упорядочивание постов
    
    function fixPosition() {
        var el = document.getElementsByClassName('post'),
            y=0,
            arr=[];
        for(var i=0; i<el.length;i++){
            arr.push(el[i]);
        }
        arr.sort(compare);
        for(var i=0; i<arr.length;i++){
            arr[i].style.top = y+'px';
            arr[i].children[0].innerHTML=(i+1) + '';
            y+=50;
        }
    }
    
    function compare(a, b){
        var a1 = +window.getComputedStyle(a, '').top.match(/\d+/)[0];
        var b1 = +window.getComputedStyle(b, '').top.match(/\d+/)[0];
        if (a1 > b1) return 1;
        if (a1 < b1) return -1;
    }
    
}());