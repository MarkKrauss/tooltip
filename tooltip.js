/*
 *	Tooltip Plugin von Markus Krauss
 * 
 * 	Optionen: hintergrund,rand,bordercolor,paddingbox,dreieck,schriftgrose,fcolor
 * 
 * 	Öffnet ein Dialogfenster über dem entsprechenden Element und schreibt den Titel hinein
 * 
 * */
$.fn.tooltip = function(opt){
	
	//Optionen (default)
	opt = $.extend({
		hintergrund: "rgb(237, 237, 237)",
		rand:2,
		bordercolor:"#fff",
		paddingbox:5,
		dreieck:10,
		schriftgrose:18,
		fcolor:"#000"
	}, opt);
 	
 	//Schreibt Tooltip Dreieck(pseudo-element) mit id:tooltip und dem Style der in den <head>
	function zeigeTooltip(pLeft,pTop){
		var style = $("<style />", {
						id:"tooltip",
		                html: '.tooltip:after{box-shadow:2px -2px 1px rgba(179, 179, 179, 0.51);content:"";'+
		                'background:linear-gradient(45deg, rgba(0,0,0,0) 50% ,'+opt.bordercolor+' 50%);'+
		                'top:'+pTop+'px;left:'+pLeft+'px;width:'+opt.dreieck+'px;height:'+opt.dreieck+'px;'+
		                'position:absolute;transform: rotate(135deg);}'
		}).appendTo("head");		
	}

	$(this).each(function(){
		//Hohlt den Text aus dem title-Attribut
		var inhalt = $(this).attr("title");
		$(this).attr("title", "");
		
		if(inhalt != undefined && inhalt != ""){
			
			$('<div class="tooltip"></div>').text(inhalt).insertAfter(this).hide();
			
			//Set Eigenschaften Toolbox 1/2
			$(this).next()
			.css({
				"color":opt.schriftfarbe,
				"font-size":opt.schriftgrose,
				"background":opt.hintergrund,			
				"border":opt.rand+"px solid "+opt.bordercolor,
				"padding":opt.paddingbox,
				"position":"absolute",
				"display":"none",
				"text-shadow": "1px 1px rgb(255, 255, 255)",
				"box-shadow": "0px 0px 2px rgba(71, 71, 71, 0.77)"
			});
		
			$(this).bind({
				mouseenter: function(ev){
					
					//Eigenschaften des ID-Elements
					el = $(this).attr('id');			
					padding = parseFloat($(this).css("padding-top").slice(0,-2));
					rand = parseFloat($(this).css("border-top-width").slice(0,-2));
					
					//GetTextCoordinaten des ID-Elements
					offset=$(this).offset();
					ttop=offset.top;
					tleft=offset.left;
					
					//Get Eigenschaften Tooltip
					boxWidth=$(this).next().outerWidth()/2;
					boxHeight=$(this).next().outerHeight();
					elWidth=$(this).outerWidth()/2;
					tboxWidth=$(this).next().innerWidth()/2;					
					
					//neue Koordinaten setzen für Toolbox				
					posLeft=tleft-boxWidth+elWidth;
					dWidth=opt.dreieck/2;
					
					x=opt.dreieck*opt.dreieck;
					diagDreiek= Math.sqrt(x+x);
					diff=diagDreiek-opt.dreieck;
					posTop=ttop-boxHeight-dWidth-diff;
					
					//Koordinaten setzen für Dreieck					
					pLeft=tboxWidth-dWidth;					
					pTop=$(this).next().innerHeight()-dWidth;
					
					zeigeTooltip(pLeft,pTop);
					
					//Set Eigenschaften Toolbox 2/2
					$(this).next().css({
							"left":posLeft+"px",
							"top":posTop+"px"
						});
						
					$(this).next().fadeIn("fast");
				}
				,
				mouseleave: function(){
					$('#tooltip').remove();
					$(this).next().slideUp("fast");					
				}
			});
		}
	});	
};