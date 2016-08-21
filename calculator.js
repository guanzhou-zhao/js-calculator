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
var prev_value
$(document).ready(
  function() {
    var $_keys = $(".key")
    keys = $_keys.map(element_to_key).get()


    $_keys.click(key_click_handler)
  }
);

var key_click_handler = function(event) {
  var $_element = $(event.target);
  var idx_in_keys = parseInt($_element.attr("data_idx"))

    console.log(idx_in_keys)
  var key = keys.filter(function(key, idx) {
    return key.idx == idx_in_keys
  })[0]

  update_data(key)
  refresh_screen()
  console.log(key)
}
var refresh_screen = function() {
  console.log(equation)
  $(".input").text(equation)
}
var update_data = function(key) {
  switch(key.type) {
    case "number":
      equation += key.value
      result = 0
      break
  }
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
  } else if (key.value == "CE")  {
    key.type = "ce"
  } else {
    key.type = "equals"
  }
  $_element.attr("data_idx", idx)

  return key
}
