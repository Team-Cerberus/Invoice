$btn-add-product.on("click", function() {
		var $productForm = $products.first().clone(),
            $productFields = $productForm.children();

        $.each($productFields, function(_, field) {
            $(field).children().val("");
        });
});