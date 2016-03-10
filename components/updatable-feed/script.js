! function(a) {
    "use strict";

    function b() {
        a(".b-updatable-feed__i:not( .i-loaded )").each(function() {
            var b = a(this),
                c = a(this).find("img"),
                d = c[0];
            d.complete ? b.addClass("i-loaded") : c.load(function() {
                b.addClass("i-loaded")
            })
        })
    }

    function c(c) {
        var e, f = a(this);
        c.preventDefault(), f.hasClass("i-loading") || (e = f.parent().data("pages"), f.addClass("i-loading"), a.ajax({
            url: f.attr("href"),
            type: "GET",
            dataType: "html",
            data: {
                page: d
            },
            success: function(a) {
                window.history.pushState({ "html": a, "page": d }, "", "?p=" + d );
                d++, d > e ? f.parent().hide() : f.removeClass("i-loading"), f.closest(".b-updatable-feed").children(".b-updatable-feed__container").append(a), setTimeout(b, 10)
                f.removeClass( "i-loading" );
            },
            error: function() {}
        }))
        
        
    }
    
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable) {
              return decodeURIComponent(pair[1]);
          }
      }
  }
        
    a(function() {
        a(".b-updatable-feed .b-load-button").click(c), b()
    });
    
    var d = getQueryVariable('p') || 1;
    
    window.history.pushState({ "html": a(".b-updatable-feed__container").html(), "page": d++ }, "", "" );
    
    window.onpopstate = function(event) {
      if ( event && event.state ) {
        d = event.state.page+1;
        if ( a(".b-updatable-feed__container .articles_list:eq(" + event.state.page + ")" ).length === 1 ) {
          var pagesNum = a(".b-updatable-feed__container .articles_list").length;
          for ( var i = event.state.page; i < pagesNum; i++ ) {
            a(".b-updatable-feed__container .articles_list:eq(" + i + ")" ).remove();
          }
        } else {
          a(".b-updatable-feed__container").append( event.state.html );
          setTimeout(b, 10);
        }
        if ( d <= a( ".b-load" ).data("pages")) {
          a( ".b-load" ).show();
        } else {
          a( ".b-load" ).hide();
        }
      }
    };
    
}(jQuery);