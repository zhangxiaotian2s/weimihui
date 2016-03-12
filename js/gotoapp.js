function goToApp() {
	this.androidappurl = 'mastergolf://mastergolf.cn/startclient';
	this.iosappurl = 'mastergolf://mastergolf.cn/startclient';
	this.androiddownurl = "http://www.baidu.com";
	this.iosdownurl = "http://www.hao123.com"
	this.u = window.navigator.userAgent
	this.ua = this.u.toLowerCase();

}
goToApp.prototype.init = function(tapclass, isauto) {

	var self = this
		//插入提示内容
	var _html = '<div class="wxtsbk" id="tsbk" style="display:none"><div class="wxtsbkbox"></div><img src="images/wxtsbk.png" class="tsimg"></div>'
	document.body.innerHTML += _html;
	self.tsbk = document.querySelector('#tsbk')
	var isWX = self.isWx();
	var tapsall = document.querySelectorAll(tapclass)
	if (isWX) {
		for (i = 0; i < tapsall.length; i++) {
			tapsall[i].addEventListener('click', function() {
				self.showTsBk()
				self.hideTsBk()
			})
		}
		return
	}

	if (isauto == true) { //普通浏览器打开自动跳转
		self.choseGoApp()
	} else { //普通浏览器手动跳转
		for (i = 0; i < tapsall.length; i++) {
			tapsall[i].addEventListener('click', function() {
				self.choseGoApp()
			})
		}
	}
}



goToApp.prototype.isWx = function() {
	if (this.ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
goToApp.prototype.versions = function() {
	return { //移动终端浏览器版本信息
		ios: !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: this.u.indexOf('Android') > -1 || this.u.indexOf('Linux') > -1, //android终端或uc浏览器
	}
}

goToApp.prototype.choseGoApp = function() {
	var verson = this.versions()
	if (verson.ios) {
		this.iosGoApp()
	} else if (verson.android) {
		this.androidGoApp()
	}
}

goToApp.prototype.androidGoApp = function() {
	var self = this
	var iframe = document.createElement("iframe");
	iframe.src = self.androidappurl;
	iframe.style.display = "none";
	document.body.appendChild(iframe);
	setTimeout(function() {
		window.location.href = self.androidappurl
	}, 500)
}
goToApp.prototype.iosGoApp = function() {
	var self = this
	window.location.href = self.iosappurl
	setTimeout(function() {
			window.location.href = self.iosdownurl
		}, 2500)
		//由于ios9以上的新定义在浏览器中打开app 会提醒用户是否打开app导致之前的打开方式失败，所以现在预留给用户2.5s的点击时间
		//如果用户没有点击打开或者点击的取消 2.5s之后会自动跳转到下载地址

}

goToApp.prototype.hideTsBk = function() {
	this.tsbk.addEventListener('click', function() {
		this.style.display = 'none'
	}, false)
}
goToApp.prototype.showTsBk = function() {
	this.tsbk.style.display = 'block'

}


