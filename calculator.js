var ac = "AC"
var ce = "CE"
var divide = "/"
var multiply = "*"
var subtract = "-"
var add = "+"
var equal = "="

var keys
var equation = ""
var result = 0
var numbers = "0123456789"
var operators = "/*-+"
var prev_key
var cur_number = ""
var equation_array = []
var is_equals_clicked = false
$(document).ready(
    function() {
        var $_keys = $(".key")
        keys = $_keys.map(element_to_key).get()


        $_keys.on({
            "click": key_click_handler,
            "mousedown": key_mousedown_handler,
            "mouseup": key_mouseup_hander
        })
    }
);


var key_click_handler = function(event) {

    var key = get_key_from_event(event)

    update_data(key)
    refresh_screen()
    prev_key = key
}
var update_data = function(key) {
    switch (key.type) {
        case "number":
            if (!(prev_key && prev_key.value == 0 && key.value == 0)) {
                cur_number += String(key.value);
            }
            break;
        case "dot":
            if (!cur_number.includes(".")) {
                if (cur_number.length == 0) {
                    cur_number += "0."
                } else {
                    cur_number += "."
                }
            }
            break;
        case "operator":
            if (prev_key && (prev_key.type == "number" || prev_key.type == "dot")) {
                equation_array.push(cur_number)
                cur_number = ""
                equation_array.push(key)
            } else if (prev_key && prev_key.type == "operator") {
                if ((typeof equation_array[equation_array.length - 1]) != "string") {
                    equation_array.pop()
                    equation_array.push(key)
                }
            }
            break;
        case "equals":
            if (cur_number.length != 0) {
                equation_array.push(cur_number)
            }
            if (equation_array.length != 0) {
                compute(equation_array.slice(0, equation_array.length))
            }
            break;
    }
}

var compute = function(equation_arr) {
    //remove last operator
    while (equation_arr.length != 0 && (typeof equation_array[equation_array.length - 1]) != "string") {
        equation_arr.pop()
    }


    sub_complete(equation_arr, "/", "*")
    sub_complete(equation_arr, "+", "-")

}
var sub_complete = function(equation_arr, operator1, operator2) {
    var index_of_operator
    var operator = equation_arr.find(function(element, index) {
        if (typeof element == "object" && (element.value == operator1 || element.value == operator2)) {
            index_of_operator = index
            return true
        } else {
            return false
        }
    })
    if (operator && index_of_operator >= 0 && index_of_operator <= equation_arr.length - 1) {
        var first = parseFloat(equation_arr[index_of_operator - 1])
        var second = parseFloat(equation_arr[index_of_operator + 1])
        var temp_result
        switch (operator.value) {
            case "/":
                temp_result = first / second;
                break;
            case "*":
                temp_result = first * second;
                break;
            case "+":
                temp_result = first + second;
                break;
            case "-":
                temp_result = first - second;
                break;
        }
        equation_arr.splice(index_of_operator - 1, 3, temp_result)
        console.log(equation_arr)
    } else {
        return
    }
    if (equation_arr.length > 1) {
        sub_complete(equation_arr, operator1, operator2)
        console.log(equation_arr)
    } else {
        result = equation_arr[0];
        console.log(equation_arr)
        is_equals_clicked = true;
        return;
    }
}
var get_key_from_event = function(event) {
    var $_element = $(event.target);
    var idx_in_keys = parseInt($_element.attr("data_idx"))

    return keys.filter(function(key, idx) {
        return key.idx == idx_in_keys
    })[0]
}
var refresh_screen = function() {
    console.log(equation_array)
    if (is_equals_clicked) {
      $(".input").text(equation_array.join(" ") + " = " + result)
    } else {
      $(".input").text(equation_array.join(" ") + " " + cur_number)
    }

    $(".result").text(result)
}


var element_to_key = function(idx, element) {
    var key = {}
    var $_element = $(element)
    key.value = $_element.text().trim()
    key.idx = idx
    if (numbers.includes(key.value)) {
        key.type = "number"
    } else if (operators.includes(key.value)) {
        key.type = "operator"
    } else if (key.value == ".") {
        key.type = "dot"
    } else if (key.value == "AC") {
        key.type = "ac"
    } else if (key.value == "CE") {
        key.type = "ce"
    } else {
        key.type = "equals"
    }
    key.toString = function() {
        return this.value;
    }
    $_element.attr("data_idx", idx)

    return key
}

var key_mousedown_handler = function(event) {
    if (event.which == 1) {
        $(event.target).addClass("mousedown")
    }
}
var key_mouseup_hander = function(event) {
    if (event.which == 1) {
        $(event.target).removeClass("mousedown")
    }
}
