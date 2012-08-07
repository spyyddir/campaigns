///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Views //////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(attach) {
	attach.MainView = Backbone.View.extend({
		initialize: function() {
			this.campaigns = new SteamPunk.Collections.Campaigns();
			this.currentView = null;
		},

		render: function() {
			this.campaignList = new SteamPunk.Views.CampaignsView({
				collection: this.campaigns
			})
			this.campaignList.render();
			this.campaigns.fetch();
			this.$el.html( this.campaignList.el );
		}
	});

	attach.CampaignsView = Backbone.View.extend({
		events: {
			"click a":"showCampaign"
		},

		initialize: function() {
			this.collection.on("reset", this.render, this);
		},

		template: function(json) {
			return Mustache.render( $("#templates-all-campaigns").html(), json );
		},

		render: function() {
			this.$el.html( this.template( {campaigns: this.collection.toJSON()} ) );

			return this;
		},

		showCampaign: function(e) {
			e.preventDefault();
			SteamPunk.Current.app.showCampaign()
		}
	});
})(SteamPunk.Views);












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OLD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// (function(attach) {
// 	attach.Campaign = Backbone.View.extend({
// 		template: function() {
// 			return '<nav id="main-nav"></nav><div id="content"></div>';
// 		},

// 		render: function() {
// 			this.$el.html( this.template() );
// 			this.nav = new SteamPunk.Views.Nav({
// 				el: "#main-nav",
// 				model: this.model
// 			}).render();
// 		},

// 		getContentArea: function() {
// 			return this.$("#content");
// 		}
// 	});

// 	SteamPunk.Views.Nav = Backbone.View.extend({
// 		events: {
// 			"click .section" : "selectSection"
// 		},

// 		template: function(json) {
// 			return Mustache.render( $("#templates-nav").html(), json );
// 		},

// 		render: function() {
// 			this.$el.html( this.template(this.model.toJSON()) );
// 			_.each(this.model.get("sections"), function(section) {
// 				var placeholder = this.$("[data-section=" + section + "]");
// 				new SteamPunk.Views.NavSection({
// 					el: placeholder,
// 					model: this.model,
// 					section: section
// 				}).render();
// 			}, this);
// 		},

// 		selectSection: function(e) {
// 			e.preventDefault();
// 			this.$(".section").removeClass("section-expanded");
// 			var $t = $(e.target).closest(".section");
// 			$t.addClass("section-expanded");
// 		}
// 	});

// 	SteamPunk.Views.NavSection = Backbone.View.extend({
// 		template: function(json) {
// 			return Mustache.render($("#templates-nav-section").html(), json);
// 		},

// 		render: function() {
// 			window.test = this.model;
// 			this.$el.html(this.template({
// 				first_letter: this.options.section.slice(0, 1),
// 				name: this.options.section,
// 				pages: this.model.contentForSection(this.options.section)
// 			}));
// 		}
// 	});

// 	SteamPunk.Views.Page = Backbone.View.extend({
// 		template: function(json) {
// 			return '<article> <header> <h1>' + json.name + '</h1> </header> <p>Home. The steaming of the tar roofs in the summer heat is the earliest smell you remember. Some say that this was the first city, built by the Angels thousands of years ago, before they left and the world began to rot. You\'re currently living near the dockyards, east of the scar. The city is home to millions, and you make up a single spec of life in that petri dish. The eastern docks are one of the seedier pieces of the city--home to crooked merchants, thieves, drug runners, and the disgruntled poor.</p> <p>The heart of the city lies a few miles inland, across thousands of shacks, warehouses, and stone-walled taverns and shops. The ground slopes increasingly upwards as the city climbs even higher, one and two story buildings giving way to fading towers and eventually to The Ring. Surrounding the houses of nobility is a set of 6 towers, wrought of white marble and bound in rusting steel. Since time immemorial these towers have stood, and the rich of the city built their homes among them.</p> </article>';
// 		},

// 		render: function() {
// 			this.$el.html( this.template(this.model.toJSON()) );
// 		}
// 	});

// 	SteamPunk.Models.Campaign = Backbone.Model.extend({
// 		defaults: {
// 			sections: [
// 				"World",
// 				"Characters",
// 				"Story"
// 			]
// 		},

// 		contentForSection: function(section) {
// 			var attempt = section.toLowerCase() + "_pages";
// 			return this.get(attempt);
// 		}
// 	});

// 	SteamPunk.Models.Page = Backbone.Model.extend({
// 		fetch: function() {
// 			this.set("name", "Something");
// 			this.set("content_html", "<p>woo!</p>");
// 			this.trigger("update");
// 		}
// 	});

// 	SteamPunk.Router = Backbone.Router.extend({
// 		routes: {
// 			"": "intro",
// 			"campaigns/:id": "campaigns",
// 			"pages/:id": "pages"
// 		},

// 		initialize: function() {
// 			console.log("booting");
// 		},

// 		intro: function() {
// 			this.navigate("campaigns/1", {trigger: true});
// 		},

// 		campaigns: function(id) {
// 			var model = new SteamPunk.Models.Campaign({
// 				name: "SP",
// 				world_pages: [
// 					{id: 1, name: "The City"},
// 					{id: 2, name: "Districts"},
// 					{id: 3, name: "Watches"},
// 					{id: 4, name: "The Chasm"}
// 				]
// 			});
// 			this.currentCampaign = id;
// 			this.currentView = new SteamPunk.Views.Campaign({
// 				el: "#app",
// 				model: model
// 			});
// 			this.currentView.render();
// 		},

// 		pages: function(id) {
// 			if (campaign_id != this.currentCampaign) this.campaigns(campaign_id);

// 			var page = new SteamPunk.Models.Page({id: id});

// 			new SteamPunk.Views.Page({
// 				el: this.currentView.getContentArea(),
// 				model: page
// 			}).render();

// 			page.fetch();
// 		}
// 	});
// })(window);