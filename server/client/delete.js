var deleteItem  = {
  init: function (){
    deleteItem.events();
  },
  events: function () {
    $(".menu").on("click", ".glyphicon-trash", function () {
      var $item = $(this).parent();
      var itemID = $item.attr("id");
      $.ajax({
          type: 'POST',
          url: '/delete-item',
          data: {id:itemID},
          success: function(data) {
            $item.remove();
            console.log("deleted");
          },
          failure: function(data) {
            console.log("FAILED TO DELETE ITEM: ", data);
          }
        });
    });
  },
};
