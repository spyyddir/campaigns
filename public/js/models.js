///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATA MODELS ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(attach) {
	// Campaign Example:
	// name: Steam Punk
	// display: SP
	// details: ["The City", "Seb"]
	// characters: ["Trixy", "Dan", "Roger", "Astrid"]
	attach.Campaign = Backbone.Model.extend({
		urlRoot: "/campaigns"
	});

	// Campaign Detail Example:
	// name: The City
	// content_html: <p>Lots of text here</p>
	attach.CampaignDetail = Backbone.Model.extend({
		urlRoot: "/campaign-details",

		fetch: function() {
			this.set("name", "Something");
			this.set("content_html", "<p>woo!</p>");
			this.trigger("update");
		}
	});

	// Character Example:
	// name: Art Vandelay
	// description: Art is an artist.
	// player: NPC
	// backstory: No one knows.
	attach.Character = Backbone.Model.extend({
		urlRoot: "/characters",

		defaults: {
			player: "NPC"
		}
	});
})(SteamPunk.DataModels);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COLLECTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(attach) {
	attach.Campaigns = Backbone.Collection.extend({
		model: SteamPunk.DataModels.Campaign,

		url: "/campaigns",

		fetch: function() {
			this.reset(this.parse([{id: 2, name: "Something"}]));
		}
	});
})(SteamPunk.Collections);