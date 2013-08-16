// videos have a set height & width - attributes on the object tag, or styles on the html5 player that replaces it on devices
// need to reset the height to match the width on resize (throttled)

namespace.videoSizeChange = function(){
	log("video size change");
	var ratio = .5612903;
	$(".videoPlayerGoesHere").each(function(){
		var videoWidth = $(this).width();
		if (videoWidth < 1){
			// the span doesn't have a width on iOs. So we'll use its parent
			videoWidth = $(this).parent().width();
		}
		var newHeight = Math.round(videoWidth  * ratio);

		// this one works on desktop browsers with object (flash video player)
		$(this).find("object").height(newHeight); 
		// for iOs
		$(this).find(".limelight-player-footprint").css({'height': newHeight + "px", 'width': videoWidth + "px"});

	});
	

} // END videoSizeChange

// called on page load to build players with the appropriate dimensions based on the window size at load
// the limelight code transforms this code into something else, based on platform/browser/etc
// but at least we start with the right dimensions

namespace.videoLoad = function(){
	var ratio = .5612903;
	var limelightKey = "YOUR_LIMELIGHT_PLAYER_KEY"; // a long alpha numeric string
	var limelightPlayer = "YOUR_LIMELIGHT_PLAYER"; // ex. limelight_player_674475 
	var tpl = '<span class="LimelightEmbeddedPlayer"><object type="application/x-shockwave-flash" id="' + limelightPlayer + '" name="' + limelightPlayer + '" class="LimelightEmbeddedPlayerFlash" width="##WIDTH##" height="##HEIGHT##" data="http://assets.delvenetworks.com/player/loader.swf"><param name="movie" value="http://assets.delvenetworks.com/player/loader.swf"/><param name="wmode" value="window"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="autoplay" value="true"/><param name="flashVars" value="mediaId=##VIDEO_ID##&amp;playerForm=' + limelightKey + '&amp;autoplay=true"/></object><script>LimelightPlayerUtil.initEmbed("' + limelightPlayer + '");';
		tpl += '<';
		tpl += '/script></span>';

		$(".videoPlayerGoesHere").each(function(){
			// find width for video. max width is 620
			var videoWidth = $(this).width();
			if (videoWidth > 620){
				videoWidth = 620;
			}
			// math the height up
			var videoHeight = Math.round(videoWidth  * ratio);

			var js = tpl.replace("##WIDTH##", videoWidth);
			js = js.replace("##HEIGHT##", videoHeight);

			// add in the video id from the data attribute
			js = js.replace("##VIDEO_ID##", $(this).data("video-id"));
			$(this).html(js);
		});

		
}
