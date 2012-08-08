///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Router /////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SteamPunk.Router = Backbone.Router.extend({
	routes: {
		"campaigns/:id": "campaigns",
		"*path": "defaultRoute"
	},

	initialize: function() {
		console.log("booting");
		this.appView = new AppView();
		this.appView.render();
		$("#app").html( this.appView.el );
	},

	defaultRoute: function(path) {
		this.appView.listCampaigns();
	},

	campaigns: function(id) {
		this.appView.showCampaign(id);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Campaign Views /////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CampaignsListView = Backbone.View.extend({
	template: function(json) {
		return Mustache.render( $("#templates-all-campaigns").html(), json );
	},

	className: "campaigns-list-view",

	events: {
		"click a" : "goToCampaign"
	},

	render: function() {
		this.$el.html( this.template( {campaigns: this.collection.toJSON()} ) );
	},

	goToCampaign: function(e) {
		e.preventDefault();
		var $t = $(e.target);
		var id = $t.data("id");
		window.campaigns_router.navigate("campaigns/" + id, {trigger: true});
	}
});

CampaignView = Backbone.View.extend({
	template: function(json) {
		return Mustache.render( $("#templates-campaign").html(), json );
	},

	className: "campaign-view",

	events: {
		"click .back" : "back",
		"click nav a.world" : "showWorld",
		"click nav a.story" : "showStory",
		"click nav a.characters" : "showCharacters"
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		this.showWorld({preventDefault: function() {}});
	},

	back: function(e) {
		e.preventDefault();
		window.campaigns_router.navigate("/", {trigger: true});
	},

	showWorld: function(e) {
		e.preventDefault();
		this.$(".sub-nav").hide();
		this.$(".sub-nav.world").show();
	},

	showStory: function(e) {
		e.preventDefault();
		this.$(".sub-nav").hide();
		this.$(".sub-nav.story").show();
	},

	showCharacters: function(e) {
		e.preventDefault();
		this.$(".sub-nav").hide();
		this.$(".sub-nav.characters").show();
	},
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// App View ///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

AppView = Backbone.View.extend({
	className: "app-view",

	initialize: function() {
		this.currentView = null;
	},

	render: function() {
		this.$el.html( "<p>hi</p>" );
	},

	listCampaigns: function() {
		this.maybeClearView();

		this.currentView = new CampaignsListView({
			collection: {
				toJSON: function() {return [
					{name: "Steam Punk", id: 1},
					{name: "Broken Orania", id: 2}
				]}
			}
		});
		this.currentView.render();
		this.$el.html( this.currentView.el );
	},

	showCampaign: function(id) {
		this.maybeClearView();

		var model = new Backbone.Model({
			id: id,
			name: "Steam Punk",
			initials: "SP"
		});

		this.currentView = new CampaignView({
			model: model
		});
		this.currentView.render();
		this.$el.html( this.currentView.el );
	},

	maybeClearView: function() {
		if (this.currentView) {
			this.currentView.undelegateEvents();
			this.currentView.remove();
			this.currentView = null;
		}
	}
});