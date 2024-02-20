$(document).ready(function () {
  // Target all cells in the "실적" column
  var cells_plan = $("table.headergrid1 td:nth-child(6)");

  // Target all cells in the "실적" column
  var cells_result = $("table.headergrid1 td:nth-child(5)");

  // Target all cells in the "단가" column
  var cells_price = $("table.headergrid1 td:nth-child(7)");

  // Iterate through each cell and replace null values with 0
  cells_plan.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });

  cells_result.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });

  cells_price.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });

  // Target all rows in the table
  var rows = $("table.headergrid1 thead tr");

  // Iterate through each row
  rows.each(function () {
    // Get cells for 실적, 단가, and 금액
    var planCell = $(this).find("td:nth-child(6)"); // Adjust index if needed

    var priceCell = $(this).find("td:nth-child(7)"); // Adjust index if needed

    var amountCell = $(this).find("td:nth-child(8)"); // Adjust index if needed

    // Get numerical values from 실적 and 단가
    var plan = parseFloat(planCell.text().replace(/,/g, "")); // Remove commas

    var price = parseFloat(priceCell.text().replace(/,/g, "")); // Remove commas

    // Calculate 금액 and format with commas
    var amount = plan * price;

    // Update 금액 cell with formatted value
    amountCell.text(formatNumber(amount));
  });

  // Target all cells in the "실적" column
  var cells = $("table.headergrid1 td:nth-child(8)");

  // Iterate through each cell and replace null values with 0
  cells.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });
  //REMOVE LAST ROW
  var lastRow = $("table.headergrid1 thead tr:last");

  // Check if the first four "td" elements are all null or empty
  var isEmpty = true;
  for (var i = 1; i < 4; i++) {
    if (
      $(lastRow)
        .find("td:nth-child(" + (i + 1) + ")")
        .text()
        .trim() !== ""
    ) {
      isEmpty = false;
      break;
    }
  }

  // If all four "td" are empty, remove the last row
  if (isEmpty) {
    lastRow.remove();
  }
  //=======
  //ADD NUMBERING
  var currentGroup = "";
  var counter = 1;
  var no = 1;

  $("table.headergrid1 thead tr").each(function (index) {
    if (no < 3) {
      no++;
      return;
    }
    var productGroup = $(this).find("td:nth-child(2)").text().trim();

    if (productGroup !== currentGroup) {
      $(this).find("td:first-child").text(counter);
      // counter += 1;
      currentGroup = productGroup;
    } else {
      counter += 1;
      $(this).find("td:first-child").text(counter);
    }

    if (productGroup === "") {
      $(this).find("td:first-child").text("");
      currentGroup = productGroup;
      counter = 1;
    }
  });

  //=======
  // Initialize variables to store the sum of each column
  var sumPlan = 0;
  var sumActual = 0;
  var sumUnitPrice = 0;
  var sumAmount = 0;

  // Iterate through each row in the table body
  $("table.headergrid1 thead tr").each(function () {
    var salesCell = $(this).find("td:nth-child(4)"); // Select SALES column cell

    // Check if the cell contains "SubTotal"
    if (salesCell.text().trim() === "소계") {
      // Get the values from the corresponding cells and sum them up
      sumPlan += parseFloat(
        $(this)
          .find("td:nth-child(5)")
          .text()
          .replace(/[^0-9.-]+/g, "")
      );
      sumActual += parseFloat(
        $(this)
          .find("td:nth-child(6)")
          .text()
          .replace(/[^0-9.-]+/g, "")
      );
      sumUnitPrice += parseFloat(
        $(this)
          .find("td:nth-child(7)")
          .text()
          .replace(/[^0-9.-]+/g, "")
      );
      sumAmount += parseFloat(
        $(this)
          .find("td:nth-child(8)")
          .text()
          .replace(/[^0-9.-]+/g, "")
      );
    }
  });

  // Fill the total values into the row with id "total"
  $("#total").find("td:nth-child(5)").text(sumPlan.toLocaleString());
  $("#total").find("td:nth-child(6)").text(sumActual.toLocaleString());
  $("#total").find("td:nth-child(7)").text(sumUnitPrice.toLocaleString());
  $("#total").find("td:nth-child(8)").text(sumAmount.toLocaleString());
  //====
  //FUNCTION FORMAT NUMBER
  function formatNumber(value) {
    if (+value < 0) {
      value = String(value);
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      return "-" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      value = String(value);
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  const thead = $("table.headergrid1 thead").html();
  $("table.headergrid1 thead").remove();
  $("table.headergrid1 tbody").prepend(thead);

  //Fill color for SubTotal
  $('tr:has(td:contains("소계"))').css("background-color", "#bcd4ec");
  $('tr:has(td:contains("합계"))').css("background-color", "#90acdc");
});
