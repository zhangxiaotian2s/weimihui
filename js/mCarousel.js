function Carousel() {
	this.carouse = document.getElementById('Carouselul')
	this.carouselli = document.querySelectorAll('#Carouselul li');
	this.rightbtn = document.getElementById('rightbtn');
	this.leftbtn = document.getElementById('leftbtn');
	this.dian = document.querySelectorAll('#danul li');
	this.carouseltitle = document.getElementById('carouseltitle');
	this.nowIndex = 0;
	this.maxlength = 4;
	this.titltdata = ['真实的社交', '各种各样的聚会', '找到最对味的人', '前所未有的乐趣'];
	this.cantap = true
}
var P_type = Carousel.prototype
P_type.init = function() {
	var self = this;
	var _length = self.carouselli.length;
	for (var i = 0; i < _length; i++) {
		self.carouselli[i].style.webkitTransition = '0.5s'
	}
	self.carouseltitle.innerText = self.titltdata[0]
	self.leftbtn.addEventListener('tap', function() {
		self.leftCarousel(self.nowIndex)
	}, false)
	self.rightbtn.addEventListener('tap', function() {
		self.rightCarousel(self.nowIndex)
	}, false)
	self.carouse.addEventListener('swipeRight', function() {
		self.rightCarousel(self.nowIndex)
	}, false)
	self.carouse.addEventListener('swipeLeft', function() {
		self.leftCarousel(self.nowIndex)
	}, false)

}


P_type.rightCarouselFn = function(i) {
	var self = this;
	self.carouselli[i].style.webkitTransform = 'translateX(100PX) scale(0.5,0.5) '
	self.carouselli[i].style.opacity = '0'
}


P_type.getNextIndex = function(i) {
	var _nextindex = i + 1;
	this.nowIndex = (_nextindex > (this.maxlength - 1) ? 0 : _nextindex);
	return this.nowIndex;
}
P_type.getPreIndex = function(i) {
	var _preindex = i - 1;
	this.nowIndex = (_preindex < 0 ? (this.maxlength - 1) : _preindex);
	return this.nowIndex;

}

P_type.rightCarousel = function(i) {
	var self = this;
	if (self.cantap == false) {
		return
	}
	self.cantap = false
	self.carouselli[i].style.webkitTransform = 'translateX(100PX) scale(0.5,0.5) '
	self.carouselli[i].style.opacity = '0'
	var _preIndex = self.getPreIndex(i)
	self.chengeDian()
	self.carouselli[_preIndex].style.opacity = '1'
	self.carouselli[i].addEventListener('webkitTransitionEnd', function() {
		self.carouselli[i].style.webkitTransform = 'translateX(0px) scale(1,1) '
		self.cantap = true
	}, false)
}

P_type.leftCarousel = function(i) {

	var self = this;
	if (self.cantap == false) {
		return
	}
	self.cantap = false
	self.carouselli[i].style.webkitTransform = 'translateX(-100px) scale(0.5,0.5) '
	self.carouselli[i].style.opacity = '0'
	var _nextIndex = self.getNextIndex(i)
	self.chengeDian()
	self.carouselli[_nextIndex].style.opacity = '1'
	self.carouselli[i].addEventListener('webkitTransitionEnd', function() {
		self.carouselli[i].style.webkitTransform = 'translateX(0px) scale(1,1) '
		self.cantap = true
	}, false)
}
P_type.chengeDian = function() {
	var self = this;
	for (var i = 0; i < self.maxlength; i++) {
		self.dian[i].setAttribute('class', '')
		self.dian[self.nowIndex].setAttribute('class', 'current')
	}
	self.carouseltitle.innerText = self.titltdata[self.nowIndex]

}