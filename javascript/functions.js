$(document).ready(function () {
    $("#geheim").hide();
});

function magic() {
    $("#geheim").slideToggle();
    $("#weiterlesen").text("Weniger...");
}

var selected = -1;

function show(i) {
    selected = i;
    var wert = files[i];
    var hinweis;
    if(wert in alt) {
        hinweis = alt[wert];
    } else {
        hinweis = "";
    }
    var h;
    if(hochkant.indexOf(wert) == -1) {
        h = false;
    } else {
        h = true;
    }
    var c = "class='vertikal'";
    if (h)
        c = "class='horizontal'";
	$("body").append("<div id='dunkelheit'></div><div id='box' "+ c +">" +
			"<img id='box_main' src='image/gallery/"+wert+".jpg' />" +
			"<a id='close' href='javascript:close()'><img src='image/javascript/close.png' alt='Schließen'/></a>" +
			"<a id='backward' href='javascript:backward()'><img src='image/javascript/back.png' alt='Zurück'/></a>" +
			"<a id='forward' href='javascript:forward()'><img src='image/javascript/next.png' alt='Weiter'/></a>" +
			"<div id='hinweis'>" + hinweis + "</div>" +
			"</div>");
	$("#dunkelheit").click(function () {
		close();
	});
	$("#dunkelheit").hide();
	$("#dunkelheit").fadeIn();
	$("#box").hide();
	$("#box").fadeIn();
	if(i == 0)
	    $("#backward").hide();
	else if(i == files.length - 1)
	    $("#forward").hide();
}

function close() {
    selected = -1;
	$("#box").fadeOut(150, function () {
		$("#box").remove();
	});

	$("#dunkelheit").fadeOut(150, function () {
		$("#dunkelheit").remove();
	});
}


function change() {
    var wert = files[selected];
    var hinweis;
    if(wert in alt) {
        hinweis = alt[wert];
    } else {
        hinweis = "";
    }
    var h;
    if(hochkant.indexOf(wert) == -1) {
        h = false;
    } else {
        h = true;
    }
    var c = "vertikal";
    if (h)
        c = "horizontal";
    $("#box").append("<img id='box_new' src='image/gallery/"+wert+".jpg' />");
    $("#box_new").hide();
    if($("#box_new").prop('complete')) {
        box_slide();
    } else
        $("#box_new").load(box_slide);
    
    $("#box").attr('class', c);
    $("#hinweis").text(hinweis);
}

function box_slide () {
    $("#box_new").slideDown(400);
    $("#box_main").slideUp(400, function() {
        $("#box_main").remove();
        $("#box_new").attr("id", "box_main");
    });
    
}

function forward() {
    selected++;
    change();
    $("#backward").show();
    
    if(selected == files.length - 1)
        $("#forward").hide();
}

function backward() {
    selected--;
    change();
    $("#forward").show();
    if(selected == 0)
        $("#backward").hide();
}
