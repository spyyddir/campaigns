$(document).ready(function() {
	// window.app = new SteamPunk.Router();
	// Backbone.history.start();

	SteamPunk.Current.app = new SteamPunk.Views.MainView({
		el: "#app"
	})
	SteamPunk.Current.app.render();
});
