const images = [
    {
        image: `https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxhbmltYWx8ZW58MHx8MHx8fDA%3D`,
        thumbnail: `https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxhbmltYWx8ZW58MHx8MHx8fDA%3D`,
        alt: 'Running white horse'
    },{
        image: `https://images.unsplash.com/photo-1705266790837-be27adc2cd1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        thumbnail: `https://images.unsplash.com/photo-1705266790837-be27adc2cd1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        alt: 'A branch of tree that changes to ice'
    },{
        image: `https://images.unsplash.com/photo-1705764237823-6679e1857cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        thumbnail: `https://images.unsplash.com/photo-1705764237823-6679e1857cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        alt: 'nature'
    },{  
        image: `https://images.unsplash.com/photo-1705722701024-e92cf3c5ac4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        thumbnail: `https://images.unsplash.com/photo-1705722701024-e92cf3c5ac4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D`,
        alt: 'A tree that standing some rock'
    },{
        image: 'https://images.unsplash.com/photo-1541870153311-d7eeb23cb2c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
        thumbnail: 'https://images.unsplash.com/photo-1541870153311-d7eeb23cb2c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
        alt:  'Cow standing new road'
    }
]

let thumbContainer = document.getElementById('thumb-container')
let currentImageIndex = 0
const displayElem = document.getElementById('display')


function init() {
    
    console.log(images)
    updateDisplayImage(images[currentImageIndex])
    createThumbnails()
}


function createThumbnails() {
    for (let image of images) {
        let thumbImg = document.createElement('img')

        thumbImg.setAttribute('src', image.image)
        thumbImg.setAttribute('alt', image.alt)
        thumbImg.setAttribute('tabindex', '0')
        thumbImg.classList.add('thumb-image')
        thumbContainer.appendChild(thumbImg)
        thumbImg.addEventListener('click', function () {
            updateDisplayImage(image)
            document.getElementById('announcer').textContent = image.alt
        })
        thumbImg.addEventListener('keydown', function (event) {
            document.getElementById('announcer').textContent = image.alt
            if (event.key === 'Enter') updateDisplayImage(image)
            
        })
    }
}

function updateScrollBar(currentImage) {

    let thumbnails = thumbContainer.querySelectorAll('.thumb-image');
    let activeThumbnail;
    thumbnails.forEach(function (thumb) {
        if(thumb.getAttribute('src') === currentImage.thumbnail) {
            activeThumbnail = thumb;
        }
    });

    if (activeThumbnail) {
    
        const thumbRect = activeThumbnail.getBoundingClientRect();
        const containerRect = thumbContainer.getBoundingClientRect();

    
        let scrollLeftPos = activeThumbnail.offsetLeft + thumbRect.width / 2 - containerRect.width / 2;

        thumbContainer.scrollTo({
            left: scrollLeftPos,
            behavior: 'smooth'
        });
    }
}


function updateDisplayImage(image) {
    let currentDisplayImage = displayElem.firstChild

    if (!currentDisplayImage) { 
        currentDisplayImage = document.createElement('img')
        displayElem.appendChild(currentDisplayImage)
    }
 
    currentDisplayImage.setAttribute('src', image.image)
    currentDisplayImage.setAttribute('alt', image.alt)
    updateScrollBar(image)
    document.getElementById('announcer').textContent = image.alt
}

next.addEventListener('click', function() { selectNextImage(1) })
prev.addEventListener('click', function() { selectNextImage(-1)})

thumbContainerHideButton.addEventListener('click', function() {
    thumbContainer.classList.toggle('hidden')
    if (thumbContainer.classList.contains('hidden')) {
        thumbContainerHideButton.classList.add('thumbContainerHideButton-thumbnailsHidden');
    } else {
        thumbContainerHideButton.classList.remove('thumbContainerHideButton-thumbnailsHidden');
    }
})



function selectNextImage(index) {
    currentImageIndex += index

    if (currentImageIndex >= images.length) currentImageIndex = 0
    if (currentImageIndex < 0) currentImageIndex = images.length - 1
    console.log(currentImageIndex)
    updateDisplayImage(images[currentImageIndex])
}

window.onload = init

let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    let threshold = 50
    if (touchendX < touchstartX - threshold) {
        console.log('swiped right');
        selectNextImage(1);
    }
    
    if (touchendX > touchstartX + threshold) {
        console.log('swiped left');
        selectNextImage(-1);
    }
}

displayElem.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

displayElem.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

window.addEventListener('keydown', handleArrowKeyPress);

function handleArrowKeyPress(event) {
    if (event.key === 'ArrowRight') {
        selectNextImage(1);
    } else if (event.key === 'ArrowLeft') {
        selectNextImage(-1);
    }
}