window.Questionnaire = {
	initialize: function() {
		this.$div = $('.questionnaire');
		this.$progress = $('.progress .mask');
		this.tpl_question = _.template($('#template-question').html());
		this.tpl_result = _.template($('#template-result').html());

		this.load_data();
		this.bind_events();
		this.start();
	},
	load_data: function() {
		this.apps = [window.Games, window.Apps];
		this.questions = [window.Q1, window.Q2];
	},
	bind_events: function() {
		var Q = this;
		$('.start .entrance', this.$div).click(function(){
			Q.prepare_questionnaire($(this).data('catagory'));
		});
		this.$div.on("click",".slide .option",function(){
			Q.next($(this).data('tag'), $(this).data('filter'));
		});
	},
	prepare_questionnaire: function(catagory) {
		catagory = parseInt(catagory);
		this.candidate_apps = _.clone(this.apps[catagory]);
		this.candidate_questions = _.shuffle(this.questions[catagory]);
		this.update_progress(0);
		this.next_question(true);
	},
	update_progress: function(reset) {
		if (reset == 0) {
			this.percentage = 100;
			this.$progress.width('0%');
		} else if (reset == 1) {
			this.$progress.width('100%');
		} else {
			this.percentage = this.percentage * 0.667;
			this.$progress.animate({ width: (100 - this.percentage) + '%' });
		}
	},
	next_question: function(starting) {
		var question = this.candidate_questions.shift();
		var $next_slide = $(this.tpl_question({ question: question })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout');
		setTimeout(function(){
			$next_slide.addClass('present');
		}, 100);
		setTimeout(function() {
			if (starting) this.$start_slide = $cur_slide.removeClass('present').removeClass('fadingout');
			$cur_slide.remove();
		}, 1000);
	},
	next: function(tag, filter) {
		tag = parseInt(tag);
		filter = parseInt(filter);
		var result = _.filter(this.candidate_apps, function(app) {
			return app.tags[tag] == filter;
		});
		if (result.length < 7) {
			this.end(_.shuffle(result).slice(0,3));
			return;
		}
		this.candidate_apps = result;
		this.update_progress();
		this.next_question();
	},
	start: function() {
		if (this.$start_slide)
			this.$div.empty().append(this.$start_slide);
		$('.start', this.$div).addClass('present');
	},
	end: function(result) {
		this.update_progress(1);
		var $next_slide = $(this.tpl_result({ apps: result })).appendTo(this.$div);
		var $cur_slide = $('.present', this.$div).addClass('fadingout')
		setTimeout(function(){
			$next_slide.addClass('present');
		}, 100);
		setTimeout(function() {
			$cur_slide.remove();
		}, 1000);
	}
}