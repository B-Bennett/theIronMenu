var filter = {
  init: function () {
    filter.events();
  },
  events: function () {
    $("aside .dropdown-menu li a").on("click", function(event){
      event.preventDefault();
      $(this).parents(".dropdown").find(".selection").text($(this).text());
    });
    $("#resetFilters").on("click",function (event) {
      event.preventDefault();
      filter.requestString="";
      _.each($(this).siblings("div").find("input"),function(box){
        box.checked=false;
      });
      $(this).siblings(".dropdown").find("#filterMenutype").find(".selection").text("Course");
      $(this).siblings(".dropdown").find("#filterMenumeal").find(".selection").text("Meal");
      display.getAllMenuItems();
    });
    $("#submitFilters").on("click", function (event) {
      event.preventDefault();
      if ($("#filterMenumeal").find(".selection").text()!="Meal"){
        filter.requestString += $("#filterMenumeal").find(".selection").text().toLowerCase()+"=true";
      }
      if ($("#filterMenutype").find(".selection").text()!="Course"){
        if (filter.requestString.length>0){
          filter.requestString+="&";
        }
        filter.requestString += "type="+$("#filterMenutype").find(".selection").text().toLowerCase();
      }
      if ($("#filterMenuPriceRange").find(".selection").text()!="Price Range"){
        if (filter.requestString.length>0){
          filter.requestString+="&";
        }
        filter.requestString += "priceRange="+$("#filterMenuPriceRange").find(".selection").text().length;
      }
      if ($("#filtervegetarian").find("input")[0].checked){
        if (filter.requestString.length>0){
          filter.requestString+="&";
        }
        filter.requestString+="vegetarian=true";
      }
      if ($("#filterglutenFree").find("input")[0].checked){
        if (filter.requestString.length>0){
          filter.requestString+="&";
        }
        filter.requestString+="glutenFree=true";
      }
      filter.getFilteredMenuItems();
      filter.requestString="";
    });

  },
  requestString:"",

  getFilteredMenuItems: function () {
    $.ajax({
      type: 'GET',
      url: '/menu',
      data: filter.requestString,
      success: function(data) {
        console.log("filtered");
        $(".menu").children("div").html("");
        menuPage.currentDataSet=JSON.parse(data);
        display.putMenuItems();
      },
      failure: function(data) {
        console.log("FAILED TO FILTER ITEMS: ", data);
      }
    });
  }
};
