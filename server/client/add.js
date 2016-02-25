var add = {
    init: function() {
        add.events();
    },
    events: function() {
      $("header .dropdown-menu li a").on("click", function(event){
        event.preventDefault();
        $(this).parents(".dropdown").find(".selection").text($(this).text());
      });
        $(".add-item-containersubmit").on("click", function(event) {
            var newMenuItem = add.addMenuItemForm();
            event.preventDefault();
            add.resetForm();
            $.ajax({
                type: 'POST',
                url: "/add-item",
                data: newMenuItem,
                success: function(data) {
                    console.log("Success");
                    menuPage.currentDataSet = [
                        newMenuItem
                    ];
                    display.putMenuItems();
                },
                failure: function(data) {
                    console.log("Failure");
                }
            });
        });
    },
    addMenuItemForm: function() {
        var itemForm = $("#addItem");
        var addItem = new MenuItem();
        addItem.breakfast = itemForm.find(".itemBreakfast")[0].checked;
        addItem.dinner = itemForm.find(".itemDinner")[0].checked;
        addItem.glutenFree = itemForm.find(".itemGF")[0].checked;
        addItem.vegetarian = itemForm.find(".itemVeg")[0].checked;
        addItem.lunch = itemForm.find(".itemLunch")[0].checked;
        addItem.name = itemForm.find(".itemName").val();
        addItem.price = itemForm.find(".itemPrice").val();
        addItem.priceRange = Math.floor(addItem.price / 10) + 1;
        addItem.type = itemForm.find(".selection").text().trim().toLowerCase();
        return addItem;
    },
    resetForm: function () {
      $("header .itemPrice").val("");
      $("header .itemName").val("");
      }
};
