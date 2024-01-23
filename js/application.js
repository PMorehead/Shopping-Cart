var calcSubtotal = function (ele) {
    var quantity = parseInt($(ele).children('.quantity').text());
    var price = parseFloat($(ele).children('.price').text().replace("$", ""));
    var subtotal = quantity * price;

    $(ele).children('.subtotal').html("$" + subtotal);
    return subtotal;
}

var sum = function (acc, x) {return acc + x};

var updateCartTotal = function () {
    var cartSubtotals = [];
    $('tbody tr').each(function (i, ele) {
        var subtotal = calcSubtotal(ele);
        cartSubtotals.push(subtotal);
    });

    var cartTotal = cartSubtotals.reduce(sum);
    $('#total').html("$" + cartTotal);
}

$(document).ready(function () {
    updateCartTotal();
});