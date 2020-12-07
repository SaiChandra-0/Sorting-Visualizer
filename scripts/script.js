const arraybox=document.getElementById('array');
const slider=document.querySelector('.slider')
var array=[];
var arrayElements=[];
var size=slider.value;
const ANIMATION_SPEED=2000;
var speed=ANIMATION_SPEED/size
generateBars(size);

slider.oninput=() => {
    size=slider.value;
    speed=ANIMATION_SPEED/size;
    generateBars(size)

}

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function generateBars(size){
    array=[]
    arrayElements=[]
    removeAllChildNodes(arraybox);
    var width=100/size;
    for(let i=0;i<size;i++){
        let value=random(5,500);
        let bar=document.createElement('div');
        bar.classList.add('bar')
        arraybox.appendChild(bar);
        bar.style.height=`${value}px`;
        bar.style.width=`${width}%`;
        bar.style.transitionDuration=`${speed*3/4}ms`
        bar.addEventListener('transitionend',(e)=>{
            removeEffect(e,bar)
        })
        array.push(value);
        arrayElements.push(bar);

    }
    // console.log(array)

}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function removeEffect(e,bar){
    if(e.propertyName!="background-color") return 
    if(bar.classList.contains('comparing')){
        bar.classList.remove('comparing')
    }
    if(bar.classList.contains('swapping')){
        bar.classList.remove('swapping')
    }
    if(bar.classList.contains('merge')){
        bar.classList.remove('merge')
    }

}

const generate_array=document.querySelector('#generate-array')
generate_array.addEventListener('click',() =>{ 

    generateBars(size)
})

const bubble=document.querySelector('#bubble-sort')
bubble.addEventListener('click',async () =>{ 
    for (var i = 0; i < size; i++) {
        console.log(arrayElements[i])
        // arrayElements[i].addEventListener('transitionend', e => { removeEffect(e, arrayElements[i]) })
        arrayElements[i].classList.remove('sorted')
    }
    disableAll()
    await bubbleSort()
    enableAll()
})

const insertion=document.querySelector('#insertion-sort')
insertion.addEventListener('click',async () =>{ 
    for (var i = 0; i < size; i++) {
        console.log(arrayElements[i])
        // arrayElements[i].addEventListener('transitionend', e => { removeEffect(e, arrayElements[i]) })
        arrayElements[i].classList.remove('sorted')
    }
    disableAll()
    await insertionSort()
    enableAll()
})

const merge=document.querySelector('#merge-sort')
merge.addEventListener('click',async () =>{ 
    for (var i = 0; i < size; i++) {
        // arrayElements[i].addEventListener('transitionend', e => { removeEffect(e, arrayElements[i]) })
        arrayElements[i].classList.remove('sorted')
    }
    disableAll()
    await mergeSort(0,size-1)
    enableAll()
})

const quick=document.querySelector('#quick-sort')
quick.addEventListener('click', async () => {
    for (var i = 0; i < size; i++) {
        console.log(arrayElements[i])
        // arrayElements[i].addEventListener('transitionend', e => { removeEffect(e, arrayElements[i]) })
        arrayElements[i].classList.remove('sorted')
    }
    disableAll()
    await quickSort(0, size - 1)
    enableAll()
        // console.log(array)
})
function disableAll(){
    generate_array.disabled=true
    bubble.disabled=true
    quick.disabled=true
    bubble.disabled=true
    merge.disabled=true
    slider.disabled=true

}
function enableAll(){
    generate_array.disabled=false
    bubble.disabled=false
    quick.disabled=false
    bubble.disabled=false
    merge.disabled=false
    slider.disabled=false
    console.log("done")

}
// console.log(array)
function swap(a,b){
    let temp=array[a];
    array[a]=array[b];
    array[b]=temp;

        arrayElements[a].style.height=`${array[a]}px`;
        arrayElements[b].style.height=`${array[b]}px`;
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, speed));
}

async function bubbleSort(){
    let count=1 
    // console.log(size)  
    for(let i=0;i<size;i++){
        for(let j=0;j<size-i-1;j++){

                if(array[j]<=array[j+1] && size<60){
                    arrayElements[j].classList.add('comparing')
                    arrayElements[j+1].classList.add('comparing')
                }

                    if (array[j] > array[j+1]) {
                        if(size<60){
                            arrayElements[j].classList.add('swapping')
                            arrayElements[j+1].classList.add('swapping')
                        }
                        swap(j,j+1)
                    }    
                await sleep();  
        }
        arrayElements[size-i-1].removeEventListener('transitionend',e => { removeEffect(e,arrayElements[end]) })
        arrayElements[size-i-1].classList.add('sorted')

    }
    
}

async function insertionSort(){
    let count=1 
    // console.log(size)  
        for (let i = 1; i < size; ++i) { 
            let key = array[i]; 
            let j = i - 1; 
            while (j >= 0 && array[j] > key) { 
                array[j + 1] = array[j]; 
                arrayElements[j+1].classList.add('swapping')
                arrayElements[j+1].style.height=`${array[j+1]}px`
                j = j - 1; 
                await sleep()
            } 
            array[j + 1] = key; 
            arrayElements[j+1].classList.add('comparing')
            arrayElements[j+1].style.height=`${array[j+1]}px`
            await sleep()
    }
    
}

async function quickSort(start, end) {
    if (start > end) {
      return;
    }
    let index =await partition(start, end)
  
    
       await quickSort(start, index - 1)
       await quickSort(index + 1, end)

  }
  
async function partition(start, end) {
        var pivot = array[end] // pivot  
        var i = (start - 1)   // Index of smaller element  
        arrayElements[end].classList.add('pivot');
    for (var j = start; j <= end - 1; j++)  
    {  
        if(array[j]>=pivot){

            arrayElements[j].classList.add('comparing')
        } 
        if (array[j] < pivot)  
        {  
            arrayElements[i+1].classList.add('swapping')
            arrayElements[j].classList.add('swapping')
            i++; 
            swap(i,j)  
        } 
        await sleep() 

    } 
    arrayElements[end].classList.remove('pivot')
    swap(i + 1, end) 
    arrayElements[i+1].removeEventListener('transitionend',e => { removeEffect(e,arrayElements[end]) })
    arrayElements[i+1].classList.add('sorted')

    await sleep() 
    return (i + 1)
}


async function mergeSort(start,end){
    if(start>=end )
        return
    // console.log(start+" "+end+" "+Math.floor((start+end)/2))
    await mergeSort( start , Math.floor((start+end)/2) )
    await mergeSort( Math.floor((start+end)/2)+1 , end )
    await mergeArrays( start , Math.floor((start+end)/2) , end ) 
    // console.log(array)
}

async function mergeArrays(start , mid , end){
    let auxArray=[]
    let i=start,j=mid+1;
    while(i<=mid && j<=end){

        if(array[i]<=array[j]){
            arrayElements[i].classList.add('comparing')
            auxArray.push(array[i])
            i++
        }
        else{
            arrayElements[j].classList.add('swapping')
            auxArray.push(array[j])
            j++
        }
        await sleep()
    }
    while(i<=mid){
        arrayElements[i].classList.add('comparing')
        auxArray.push(array[i])
        i++
        await sleep()
    }
    while(j<=end){
        arrayElements[j].classList.add('swapping')
        auxArray.push(array[j])
        j++
        await sleep()
    }
    for(i=start;i<=end;i++){
        array[i]=auxArray[i-start]
        arrayElements[i].style.height=`${auxArray[i-start]}px`
        arrayElements[i].classList.add('merge')
        await sleep()
    }
} 