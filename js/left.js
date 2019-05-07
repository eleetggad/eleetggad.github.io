var newHeight;
var tl;

function receiveScrollData(data){
    
	if(data.scroll > (data.body - $("#scrollLeft").height())){
		data.scroll = data.body - $("#scrollLeft").height();
	} 
	
	newHeight = ISM.shared.get('topHeight');
	
	if(data.scroll>newHeight){
	    
	    TweenMax.to(scrollLeft,1,{top:data.scroll - newHeight});
	    TweenMax.to($("#scrollLeft"), 1, {opacity:1});
	    TweenMax.to($("#side_box"), 0.5, {x:130});
	    
	    tl.play();
	    
	}else{
	
	    TweenMax.to(scrollLeft,1,{top:0});
	    TweenMax.to($("#scrollLeft"), 0.5, {opacity:0});
	    TweenMax.to($("#side_box"), 0.5, {x:0});
	    tl.pause();
	}
}

function animate(){
    tl = new TimelineMax({paused:true, repeat:3, onComplete:function(){ TweenMax.fromTo($("#left_img1"), 1, {opacity:0, x:50}, {opacity:1, x:0}); }});
    
    TweenMax.fromTo($("#side_box"), 1, {opacity:0}, {opacity:1, delay:3});
    TweenMax.fromTo($("#clickCatcher"), 1, {autoAlpha:0}, {autoAlpha:1, delay:3});
    
    tl.to($("#left_img2"), 0.1, {opacity:0})
      .fromTo($("#left_img1"), 1, {opacity:0, x:50}, {opacity:1, x:0})
      .to($("#left_img1"), 1, {opacity:0}, "+=2")
      .fromTo($("#left_img2"), 1, {opacity:0, x:50}, {opacity:1, x:0}, "-=0.2")
      .to($("#left_img2"), 1, {opacity:0}, "+=2")
}

function hulkSmash(){
    TweenMax.to($("#top_hulk"), 0.6, {opacity:1});
}