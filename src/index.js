import _ from 'lodash'
import './style.css'
import WPPath from './WP.png'
function component(){
    var element = document.createElement('div')
    element.innerHTML = _.join(['Hello','webpack'],' ')
    element.classList.add('hello')

    // 将图像添加到我们现有的div
    var myIcon = new Image()
    myIcon.src = WPPath
    element.appendChild(myIcon)
    return element
}
document.body.appendChild(component())