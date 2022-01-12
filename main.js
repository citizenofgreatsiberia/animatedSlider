// DOM objects:
const body = document.querySelector('body');
const outerWrapper = document.querySelector('.outer-wrapper');
const options = document.querySelector('.options');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slider = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider-line');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderItem = document.querySelector('.slider-item');
const buttons = document.querySelector('.slider-buttons');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const selectToShow = document.querySelector('.slider-select-show');
const selectToScroll = document.querySelector('.slider-select-scroll');
const tiltAngle = document.querySelector('.tilt-angle');
const gear = document.querySelector('.gear');

//Metrix:
let position = 0;
let slidesToShow = 1; // изначальное количество отображаемых слайдов
let slidesToScroll = 1; // изначальное количество пролистываемых слайдов
const itemWidth = sliderItem.offsetWidth; // ширина слайда 320
const itemHeight = sliderItem.offsetHeight; //высота слайда 568
options.style.width = `${itemWidth}px`; // ширина панели настроек 320
options.style.height = `${itemHeight}px`;
let sliderWidth = slider.style.width = `${slidesToShow * itemWidth}px`; // ширина слайдера = ширина слайда * кол-во отображаемых слайдов
buttons.style.width = sliderWidth; // ширина блока с кнопками равна ширине слайдера
buttons.style.top = `${itemHeight}px`; //позиционируем блок с кнопками внизу под слайдером (чтобы на него не распространялся box-shadow)
outerWrapper.style.width = `${slidesToShow * itemWidth + itemWidth}px`; // ширине внесшней обертки равна ширина слайдреа плюс ширина панели настройки 640 

//slider functionality:

nextBtn.addEventListener('click', () => {
	let slidesLeft = sliderItems.length - Math.abs(position) / itemWidth - slidesToShow; // количество оставшихся слайдов равно количество всех слайдов минус количество прокрученных слацдов и количество отображаемых слайдов
	position -= (slidesLeft <= slidesToScroll) ? slidesLeft * itemWidth : slidesToScroll * itemWidth;
	sliderLine.style.transform = `translateX(${position}px)`;
	checkBtn();
});

prevBtn.addEventListener('click', () => {
	let slidesLeft = Math.abs(position) / itemWidth;
	position += (slidesLeft <= slidesToScroll) ? slidesLeft * itemWidth : slidesToScroll * itemWidth;
	sliderLine.style.transform = `translateX(${position}px)`;
	checkBtn();
});

const checkBtn = () => {
	prevBtn.disabled = position === 0;
	nextBtn.disabled = position === -(sliderItems.length * itemWidth - slidesToShow * itemWidth);
};
checkBtn();

selectToShow.addEventListener('input', () => {
	slidesToShow = selectToShow.options.selectedIndex;

	if ((Math.abs(position) / itemWidth + slidesToShow) > sliderItems.length) { // без этой проверки выбор количества отображаемых слайдов работает с багом (если прокрутить все слайды до конца с одним отображаемым слйдом, то при выборе 2 или 3 отображаемых слайдов - справа остается пустое место)
		position += (slidesToShow -1) * itemWidth;
		sliderLine.style.transform = `translateX(${position}px)`;
	};

	sliderWidth = slider.style.width = `${slidesToShow * itemWidth}px`; 
	outerWrapper.style.width = `${slidesToShow * itemWidth + itemWidth}px`;
	buttons.style.width = sliderWidth;
	// console.log(slidesToShow);
	checkBtn();
});

selectToScroll.addEventListener('input', () => {
	slidesToScroll = selectToScroll.options.selectedIndex;
	// console.log(slidesToScroll);
});

body.addEventListener('mousemove', (event) => {
	let startPoint = body.offsetWidth / 2;
	let coords = event.clientX;
	outerWrapper.style.transform = `perspective(500px) rotateY(${(coords - body.offsetWidth / 2) / 100}deg)`;
	outerWrapper.style.boxShadow = `${-(coords - body.offsetWidth / 2) / 100}px 0px 5px 2px rgba(0, 0, 0, 0.5)`;
});

// Animations:
let gearPos = 0;
let gearStep = 60;

nextBtn.addEventListener('click', () => {
	gearPos += gearStep;
	gear.style.transform = `rotate(${gearPos}deg)`;
});

prevBtn.addEventListener('click', () => {
	// gearPosNext = 0
	gearPos -= gearStep;
	gear.style.transform = `rotate(${gearPos}deg)`;
});