var calcSubtotal = function (ele) {
    var quantity = parseInt($(ele).find('.quantity input').val());
    var price = parseFloat($(ele).children('.price').text().replace("$", ""));
    var subtotal = quantity * price;

    if (subtotal > 0) {
        $(ele).children('.subtotal').html("$" + subtotal);
    };
    
    return subtotal;
}

var sum = function (acc, x) { return acc + x; };

var updateCartTotal = function () {
    var cartSubtotals = [];
    $('tbody tr').each(function (i, ele) {
        var subtotal = calcSubtotal(ele);
        cartSubtotals.push(subtotal);
    });

    var cartTotal = cartSubtotals.reduce(sum);
    if (cartTotal > 0) {
        $('#total').html("Cart Total: $" + cartTotal);
    };
    
}

$(document).ready(function () {
    updateCartTotal();

    $('.btn.remove').on('click', function (event) {
        $(this).closest('tr').remove();
        updateCartTotal();
    });

    $('tr input').on('input', function() {
        updateCartTotal();
    })
});