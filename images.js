const addImagesOnPageLoad = function(){
    const initialImages = Array.from(document.querySelectorAll('img'))
    for(var i = 0; i < initialImages.length; i++){
        initialImages[i].src = getImageName(nums[i])
    }
}

const addImagesOnScroll = function(){
    for(let i = 0; i < 2; i++){
        lastImg = document.querySelector('img:last-of-type')

        let imgToAdd = document.createElement('img');
        imgToAdd.src = getImageName(nums.pop())
        lastImg.insertAdjacentElement('afterend', imgToAdd)
    }
}

const getImageName = function(n){
    if(n < 10){
        return `files/0${n}.jpeg`
    } else {
        return `files/${n}.jpeg`
    }
}

const shuffle = function(array){
    let l = array.length, t, i

    while(l){
        i = Math.floor(Math.random() * l)
        l--

        t = array[l]
        array[l] = array[i]
        array[i] = t
    }

    return array
}

const handleInfiniteScroll = function(){
    throttle(() => {
        const endOfPage =
            window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
        if (endOfPage) {
            addImagesOnScroll()
        }
        if (nums.length == 0) {
            removeInfiniteScroll()
        }
        }, 1000)
}

const throttle = function(callback, time){
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
    callback();
    throttleTimer = false;
    }, time);
};

const removeInfiniteScroll = function(){
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
};

window.addEventListener("scroll", handleInfiniteScroll);

var nums = shuffle(Array.from({length: 208}, (_, i) => i + 1))

var throttleTimer;

addImagesOnPageLoad()