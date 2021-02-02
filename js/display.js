// --- Main Pane Hight --- //
window.addEventListener('load',
  function(){
    var target = document.getElementById('contents');
    var height = calcHeight()
    if (target) {
      target.style.height = height + 'px';
    }
  }, false);

window.addEventListener('resize',
  function(){
    var target = document.getElementById('contents');
    var height = calcHeight()
    target.style.height = height + 'px';
}, false);

function calcHeight() {
  height = document.documentElement.clientHeight;
  if (document.getElementById('header')) {
    let header = document.getElementById('header').clientHeight;
    let others = document.getElementById('toolbar').clientHeight;
    height = height - (header + others);
  }
  return height
};


// --- Check Orientation --- //
window.addEventListener('DOMContentLoaded', (event) => {
  let orient = document.getElementById('select-orientation');
  orient.addEventListener('click', changeOrient);

  function changeOrient(event) {
    // Index
    let ul = event.currentTarget;
    let list = ul.childNodes;
    let target = event.target;

    // currentクラスを削除
    for(let i = 0, max = list.length; i < max; i++) {
      var x = i;
      var t = list[x];
      t.classList.remove('active');
    }
    // 押されたliにcurrentクラスを追加
    target.classList.add('active');

    // contentsを取得
    let contents = document.getElementById('contents');
    
    // currentクラスを削除
    for(let i = 0; i < contents.childElementCount; i++) {
      var div = contents.children[i]
      div.classList.remove('active');
    }
    
    // 押されたliと同じ順番のdivにcurrentクラスを追加
    let content = contents.getElementsByClassName('content');
    list = [].slice.call(list);
    let index = list.indexOf(target);	
    content[index].classList.add('active');
  }
});

