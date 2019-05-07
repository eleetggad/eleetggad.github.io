var bInitCalled = false, bPageLoaded = false, tl = null;

$(window).load(function(e){
	bPageLoaded = true;
	checkReady();
});

function checkReady(){
	if (bInitCalled && bPageLoaded) {			
		ISM.sendInitComplete();
		if (window.self === window.top){ 
			doStart();
		}
	}
}

function init() {
	//click tags
	setUpClickTags();
	//init checks
	bInitCalled = true;
	checkReady();
}

function setUpClickTags(){
	//automatically set up event tags
	$("*[data-ism-event]").click(function(event){
		if($(this).attr("data-ism-event")){
			var ev = parseInt($(this).attr("data-ism-event"));
			if(ev){
				event.preventDefault();
				event.stopPropagation();
				ISM.eventTag(ev);
			}
		}
	});
}

function doStart() {
	//Main area visible (initially hidden in CSS)
	$("body").css({ visibility: "visible"});
	//Execute animations
	animate();
}

$(document).ready(function(){
	if (window.self === window.top){
		init();
	}
});