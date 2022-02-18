function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	//console.log('Query variable %s not found', variable);
	return undefined;
}

if( !( getQueryVariable( "locale" ) === undefined ) )
	String.locale = getQueryVariable( "locale" );

var timer;
function startTimeOut()
{
	if( timer )
		window.clearInterval( timer );
	timer = setInterval( function() {
					href( "intro1920x1080.html" );
				}, 1 * 60 * 1000 );
}

function l( string ) {
	return string.toLocaleString();
} 

function href( url ) {
	window.location.href = url + "?locale=" + String.locale;
}

function localize( )
{   
	// localize text
	$("span[id^='\\%']").text( function(index) { return l( this.id ); } );

	// localize images
	$("img[id^='\\%']").attr( "src", function(index,value) { return l( this.id ); } );

	// localize videos
	$(".video-js[id^=\\%]").each( function(index) {
		player = videojs( this.id );

		paused = player.paused();

		player.pause();
		player.src([
			{ type: "video/mp4", src: l( this.id + "_mp4" ) },
			{ type: "video/webm", src: l( this.id + "_webm" ) },
			{ type: "video/ogg", src: l( this.id + "_ogv" ) }
		]);

		// setting the poster using player.poster() doesn't work correctly, so we need to hack it ... 
		$("#\\" + this.id + " .vjs-poster" ).css( "background-image", "url(\"" + l( this.id + "_poster" ) + "\")" );
		player.poster( l( this.id + "_poster" ) );

		if( !paused )
			player.play();
	} );
}

function selectLanguage( lang )
{
	String.locale = lang; 
	localize( );
}
