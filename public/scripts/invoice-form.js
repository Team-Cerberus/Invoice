$btn-add-product.on("click", function() {
		const $productForm = $products.first().clone(),
            $productFields = $productForm.children();

        $.each($productFields, function(_, field) {
            $(field).children().val("");
        });
});