var newHeight;
var tl;

function receiveScrollData(data){
    
	if(data.scroll > (data.body - $("#scrollRight").height())){
		data.scroll = data.body - $("#scrollRight").height();
	} 
	
	newHeight = ISM.shared.get('topHeight');
	
	if(data.scroll>newHeight){
	    
	    TweenMax.to(scrollRight,1,{top:data.scroll - newHeight});
	    TweenMax.to($("#hideMe"), 1, {opacity:1});
	    TweenMax.to($("#side_box, #clickCatcher"), 1, {y:255});
	    
	    tl.play();
	
	}else{
	
	    TweenMax.to(scrollRight,1,{top:0});
	    TweenMax.to($("#hideMe"), 0.5, {opacity:0});
	    TweenMax.to($("#side_box, #clickCatcher"), 0.5, {y:0});
	    
	    tl.pause();
	}
}

function animate(){
    tl = new TimelineMax({paused:true, repeat:3, onComplete:function(){ TweenMax.fromTo($("#right_img1"), 1, {opacity:0, x:-50}, {opacity:1, x:0}); }});
    
    TweenMax.fromTo($("#side_box"), 1, {opacity:0}, {opacity:1, delay:3});
    TweenMax.fromTo($("#clickCatcher"), 1, {autoAlpha:0}, {autoAlpha:1, delay:3});
    
    tl.to($("#right_img2"), 0.1, {opacity:0})
      .fromTo($("#right_img1"), 1, {opacity:0, x:-50}, {opacity:1, x:0})
      .to($("#right_img1"), 1, {opacity:0}, "+=2")
      .fromTo($("#right_img2"), 1, {opacity:0, x:-50}, {opacity:1, x:0}, "-=0.2")
      .to($("#right_img2"), 1, {opacity:0}, "+=2")
    ;
}
