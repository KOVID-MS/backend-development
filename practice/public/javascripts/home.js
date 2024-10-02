var heading = document.getElementById('heading')
var button = document.getElementById('btn')

button.onclick = ()=>{
    var conf = confirm('Do you want to change Hello to Hey')
    if(conf){
        heading.innerHTML = 'Hey'
    }

}