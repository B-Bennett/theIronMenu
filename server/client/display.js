var display = {
    init: function() {
        display.styling();
    },
    styling: function() {
        display.getAllMenuItems();
    },
    getAllMenuItems: function() {
        $(".menu").children("div").html("");
        $.ajax({
            type: 'GET',
            url: '/menu',
            success: function(data) {
                menuPage.currentDataSet = JSON.parse(data);
                display.putMenuItems();
            },
            failure: function(data) {
                console.log("FAILURE: ", data);
            }
        });
    },
    putMenuItems: function() {
        var itemHTML;
        _.each(menuPage.currentDataSet, function(currVal, idx, arr) {
            itemHTML = menuPage.menuItemTemplate(currVal);
            var itemType = currVal.type;
            $("."+itemType).append(itemHTML);
            if (menuPage.admin) {
                $(".admin").removeClass("hidden");
            }
        });
    },
};
