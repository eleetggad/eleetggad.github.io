var tHeight;
var player, 
    playerSettings;
    
function receiveScrollData(data){
}

function animate(){
    var tl = new TimelineMax();
    
    tHeight = $("#backgroundTop").height();
    ISM.shared.set('topHeight', tHeight);
    
    ISM.autorun(function(){
        var pageW = ISM.shared.get("pageW") || 0;
        
        if(pageW > 0){
            $("#scrollTop").css({
                width:pageW
            });
        }
    });
    
    var videoItems = [
        {
            name: 'Video 1',
            mp4: 'assets/video.mp4',
            ogg: '',
            tracking: {'0%': 3, '25%': 4, '50%': 5, '75%': 6, '98%': 7}
        }
    ]
        
    playerSettings = {
        'videoId': 'video1',
        'videoItems': videoItems,
        'playInFullscreen': false,
        'autoplay': false,
        'trackingCallback': trackingHandler,
        'playCallback': onPlayerPlay
    }
    
    player = new ISM.VideoPlayer(playerSettings, onPlayerReady);
    
    tl.fromTo($("#top_copy"), 1, {scale:0.5, opacity:0}, {ease:Power4.EaseIn, scale:1, opacity:1})
      .add([
                TweenMax.to($("#top_copy"), 0.5, {opacity:0}),
                TweenMax.to($("#top_fadeBig"), 1, {opacity:1}),
          ], "+=1")
      .add([
                TweenMax.fromTo($("#top_cap"), 0.6, {opacity:0, x:30}, {opacity:1, x:0}),
                TweenMax.fromTo($("#top_hulk"), 0.6, {opacity:0}, {opacity:1, delay:0.2, onStart:function(){ 
                    ISM.callFunctionLeft("hulkSmash");
                }}),
                TweenMax.staggerFromTo($("#top_ironman, #top_spidey"), 0.6, {opacity:0, x:-30}, {opacity:1, x:0}, 0.2),
                TweenMax.fromTo($("#top_logo"), 0.7, {opacity:0, scale:0.2}, {ease:Back.easeOut, opacity:1, scale:1, delay:0.3}),
          ])
      .to($("#video-wrapper"), 1, {y:250}, "-=0.5")
    ;

}

function onPlayerReady() {
    if(playerSettings.autoplay) $( "#vid-mute-button" ).one( "click", function() { ISM.eventTag(7) });
    $('#vid-play-catcher').click(function(e){ e.stopPropagation(); player.togglePlay(); })
    $('#vid-mute-button').click(function(e){ e.stopPropagation();  player.toggleMute(); })

    // To have a button that loads another video, you can use player.switchVideo() as follows
    // $('#button').click(function(){ player.switchVideo('Westfield') });
    // or.. $('#button').click(function(){ player.switchVideo(1) });
    
    // Player event listeners
    player.on('pause', refreshControls);
    player.on('volumechange', refreshControls);
    player.on('timeupdate', function(){
       // progress bar
       var width = $('#video-wrapper').width() * (player.currentTime() / player.duration())
       
       if(width) {
           TweenLite.to('#vid-progress-bar', 0.3, {width: width * (player.currentTime() / player.duration()), ease: Linear.easeNone})
       }
   });
   
   player.on('ended', function(){
       TweenLite.to('#big-play-container, #poster', 0.25, {autoAlpha: 1});
       TweenLite.to('#big-play', 0.25, {scale: 1});
    
       // Pulsing play button
       TweenMax.from('#big-play-pulse', 1, {opacity:1, scale:0, ease:Quad.easeOut, repeat:16});
    });

    refreshControls();
}

function onPlayerPlay() {
    
    // hide poster and big play button if not full screen
    if (!playerSettings.playInFullscreen){
        TweenLite.to('#big-play', 0.25, {scale: 1.3});
        TweenLite.to('#big-play-container, #poster', 0.25, {autoAlpha: 0});
        TweenMax.to($('#video-controls').children(), 0.25, {autoAlpha: 1});
    }
    
    refreshControls();
}

function refreshControls(){
    if (player.muted()){
        TweenLite.to('#vid-mute-button', 0.1, {className: '+=mute'});
    } else {
        TweenLite.to('#vid-mute-button', 0.1, {className: '-=mute'});
    }
    
    if (player.paused()){
        TweenLite.to('#vid-play-button', 0.1, {className: '-=pause'});
    } else {
        TweenLite.to('#vid-play-button', 0.1, {className: '+=pause'});
    }
}

function trackingHandler(e){
}