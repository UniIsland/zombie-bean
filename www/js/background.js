$(function() {
	var tIcon = _.template('\
				<div class="icon">\
					<div class="front">\
						<img src="./img/appicons/icon_<%=a%>.png" alt="" />\
					</div>\
					<div class="back">\
						<img src="./img/appicons/icon_<%=b%>.png" alt="" />\
					</div>\
				</div>')
	window.tIcon = tIcon
	var $background = $('.background')
	var i, a
	var html = ''
	var iconNum = 116
	var showNum = 96
	var j = Math.floor(Math.random() * showNum)
	for (i = 0; i < showNum; i++) {
		html += tIcon({a: 1, b: 1})
	}
	var hiddenImgs = []
	var $icons = $(html)
	$icons.find('.front img').each(function(i, el) {
		a = j++ % iconNum + 1
		$(el).attr('src', './img/appicons/icon_'+a+'.png')
	}).end().appendTo($background)
	for (i = 0; i < 20; i++) {
		a = j++ % iconNum + 1
		hiddenImgs.push(a)
	}

	$icons = $background.find('.icon')
	function flip() {
		var n = Math.floor(Math.random() * showNum)
		var $icon = $icons.eq(n)
		var $imgShowing = $icon.find($icon.hasClass('flip') ? '.back img' : '.front img')
		var imgId = parseInt($imgShowing.attr('src').match(/icon_(\d{1,3})\.png/)[1], 10)
		hiddenImgs.push(imgId)
		$icon.find($icon.hasClass('flip') ? '.front img' : '.back img').attr('src', './img/appicons/icon_'+hiddenImgs.shift()+'.png')
		$icon.toggleClass('flip')
	}
	function randomFlip() {
		var n = Math.floor(Math.random() * 7000) + 3000
		setTimeout(function() {
			flip()
			randomFlip()
		}, n)
	}
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
	randomFlip()
})
