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

    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateCartTotal();
    });

    var timeout;
    $(document).on('input', 'tr input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            updateCartTotal();
        }, 500);
    });

    $('#addItem').on('submit', function(event) {
        event.preventDefault();
        var item = $(this).children('[name=item]').val();
        var price = $(this).children('[name=price]').val();
        var quantity = $(this).children('[name=quantity]').val();

        $('tbody').append('<tr>' + '<td class="item">' + item + '</td>' + '<td class="price">$' + price + '</td>' + '<td class="quantity"><input type="number" value="' + quantity + '"/></td>' + '<td><button class="btn btn-light btn-sm remove">Remove</button></td>' + '<td class="subtotal">$--.--</td>' + '</tr>');

        updateCartTotal();
        $(this).children('[name=item]').val('');
        $(this).children('[name=price]').val('');
        $(this).children('[name=quantity]').val('');
    });
});