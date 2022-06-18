const menu = document.querySelector( '.menu' )
const menuBtn = document.querySelector( '.menu-btn' )

// Toggle open/close menu
menuBtn.addEventListener( 'click', () => {
    menu.classList.toggle( 'menu-open' )
} )

/*===== Slider =====*/
const pag = document.querySelectorAll( '.pag' )
const prev = document.querySelector( '.prev' )
const next = document.querySelector( '.next' )
const img = document.querySelectorAll( '.slider-img' )
const overlay = document.querySelectorAll( '.overlay' )
const anim = document.querySelectorAll( '.anim' )

// Get the CSS Variables from root
const r = document.querySelector( ':root' )
const rs = getComputedStyle( r )

let id = 0

// Image Paths
const images = [
    './static/images/img1.jpg',
    './static/images/img2.jpg',
    './static/images/img3.jpg',
    './static/images/img4.jpg',
    './static/images/img5.jpg',
]

colors = [
    '#feb57b',
    '#ffa901',
    '#b5162e',
    '#27223f',
    '#468cc2',
]

const retrigAnim = () => {
    anim.forEach( ( el, idx ) => {
        el.style.animation = 'none'
        el.offsetHeight
        el.style.animation = null
    } )
}

const slider = i => {
    // Retrigger animations
    retrigAnim()

    // Reset image source
    img.src = images[ i ]

    // Rechange accent color
    r.style.setProperty( '--accent', colors[ i ] )

    // Toggle active class to pagination
    // Remove active class from all
    pag.forEach( ( el, idx ) => {
        el.classList.remove( 'active' )
    } )

    // Reset active class to clicked pagination
    pag[ i ].classList.add( 'active' )
}

const nextSlide = () => {
    // Increment img id
    id++
    // Check if id is greater than the number of available slides
    if ( id > pag.length - 1 ) {
        id = 0
    }
    // Run the slider function
    slider( id )
}

// Automate slider
let autoSlide = setInterval( nextSlide, 10000 )

const stopAutoSlide = () => {
    clearInterval( autoSlide )

    // Restart Auto Slider
    autoSlide = setInterval( nextSlide, 10000 )
}

// pagination
pag.forEach( ( el, idx ) => {
    // Add click event got all pagination
    el.addEventListener( 'click', () => {
        // Run the slider function
        slider( idx )
        // Set id to clicked pagination index
        id = idx
        // Stop auto slide
        stopAutoSlide()

    } )
} )

// Prev
prev.addEventListener( 'click', () => {
    // Decrement img id
    id--

    // Check if id is smaller than the number of aailable slides
    if ( id < 0 ) {
        id = pag.length - 1
    }

    // Run the slider function
    slider( id )
    // Stop Auto Slide
    stopAutoSlide()
} )

// Next
next.addEventListener( 'click', () => {
    nextSlide()

    stopAutoSlide()
} )