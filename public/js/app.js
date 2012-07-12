(function(window) {
	window.SteamPunk = {
		Views: {}
	};

	SteamPunk.Views.Campaign = Backbone.View.extend({
		template: function() {
			return '<nav id="main-nav"></nav><div id="content"></div>';
		},

		render: function() {
			this.$el.html( this.template() );
			this.nav = new SteamPunk.Views.Nav({
				el: "#main-nav",
				model: this.model
			}).render();
		},

		getContentArea: function() {
			return this.$("#content");
		}
	});

	SteamPunk.Views.Nav = Backbone.View.extend({
		template: function(json) {
			return '<div id="current-game">' + json.name + '</div> <ul id="sections"> <li class="section section-expanded"> <h2> <span>G</span> <strong>Geography</strong> </h2> <ul class="sub-sections"> <li><a href="#campaigns/1/pages/1" class="selected">The City</a></li> <li><a href="#campaigns/1/pages/2">Districts</a></li> <li><a href="#campaigns/1/pages/3">Watches</a></li> <li><a href="#campaigns/1/pages/4">The Chasm</a></li> </ul> </li> <li class="section"> <h2> <span>P</span> <strong>Power</strong> </h2> </li> <li class="section"> <h2> <span>C</span> <strong>Characters</strong> </h2> </li> </ul>';
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
		}
	});

	SteamPunk.Views.Page = Backbone.View.extend({
		template: function(json) {
			return '<article> <header> <h1>' + json.name + '</h1> </header> <p>Home. The steaming of the tar roofs in the summer heat is the earliest smell you remember. Some say that this was the first city, built by the Angels thousands of years ago, before they left and the world began to rot. You\'re currently living near the dockyards, east of the scar. The city is home to millions, and you make up a single spec of life in that petri dish. The eastern docks are one of the seedier pieces of the city--home to crooked merchants, thieves, drug runners, and the disgruntled poor.</p> <p>The heart of the city lies a few miles inland, across thousands of shacks, warehouses, and stone-walled taverns and shops. The ground slopes increasingly upwards as the city climbs even higher, one and two story buildings giving way to fading towers and eventually to The Ring. Surrounding the houses of nobility is a set of 6 towers, wrought of white marble and bound in rusting steel. Since time immemorial these towers have stood, and the rich of the city built their homes among them.</p> </article>';
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
		}
	});

	SteamPunk.Router = Backbone.Router.extend({
		routes: {
			"": "intro",
			"campaigns/:id": "campaigns",
			"campaigns/:campaign_id/pages/:id": "pages"
		},

		initialize: function() {
			console.log("booting");
		},

		intro: function() {
			this.navigate("campaigns/1", {trigger: true});
		},

		campaigns: function(id) {
			var model = new Backbone.Model({name: id});
			this.currentCampaign = id;
			this.currentView = new SteamPunk.Views.Campaign({
				el: "body",
				model: model
			});
			this.currentView.render();
		},

		pages: function(campaign_id, id) {
			if (campaign_id != this.currentCampaign) this.campaigns(campaign_id);

			var page = new Backbone.Model({name: "Page " + id});

			new SteamPunk.Views.Page({
				el: this.currentView.getContentArea(),
				model: page
			}).render();
		}
	});
})(window);