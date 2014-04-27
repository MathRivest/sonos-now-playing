var uiState = {
	trackTitle: null
}


socket.on('topology-change', function (data) {
	updateCurrentTrackInfo(data[0].state);
	uiState.trackTitle = data[0].state.currentTrack.title;
	console.log(uiState.trackTitle);
});

socket.on('transport-state', function (player) {

	console.log(player.state)

	//Change only if its a different track number
	if(uiState.trackTitle != player.state.currentTrack.title){
		updateCurrentTrackInfo(player.state);
	}
	console.log(uiState.trackTitle, player.state.currentTrack.title)
	uiState.trackTitle = player.state.currentTrack.title;
});


var updateCurrentTrackInfo = function(obj){
	console.log(obj);

	var currentTrack = obj.currentTrack,
		nextTrack = obj.nextTrack;

	//Current track
	$('#current-track-art').attr('src', currentTrack.albumArtURI)
	//document.getElementById("current-track-art").src = currentTrack.albumArtURI;
	$("#current-track-title").text(currentTrack.title);
	$("#current-track-artist").text(currentTrack.artist);
	$("#current-track-album").text(currentTrack.album);

	//Next track
	$("#next-track-art").attr('src', nextTrack.albumArtURI)
	$("#next-track-title").text(nextTrack.title);
	$("#next-track-artist").text(nextTrack.artist);
	$("#next-track-album").text(nextTrack.album);

	//Container
	$(".m-background").css('background-image', "url('" + currentTrack.albumArtURI + "')");

	$(".m-background-init").fadeOut(1000, function(){
		$('.m-background').fadeTo(400, 0.65);
		$('body').addClass('loaded');
	});


};
