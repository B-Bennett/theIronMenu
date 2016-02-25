var menuPage = {
  init: function (){
    display.init();
    deleteItem.init();
    add.init();
    edit.init();
    filter.init();
    signin.init();
  },
  menuItemTemplate: _.template($("#menuItemTmpl").html()),
  currentDataSet: {},
  admin:false
};

var MenuItem = function(breakfast,dinner,glutenFree,id,lunch,name,price,type,vegetarian){
  this.id=id;
  this.name=name;
  this.type=type;
  this.breakfast = breakfast;
  this.lunch=lunch;
  this.dinner=dinner;
  this.price=price;
  this.vegetarian=vegetarian;
  this.glutenFree=glutenFree;
  this.priceRange=Math.floor(price/10) +1;
};


$(document).ready(function () {
  menuPage.init();
});
