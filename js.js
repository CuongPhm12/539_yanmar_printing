$(document).ready(function () {
  // Target all cells in the "실적" column
  var cells_6 = $("table.headergrid1 td:nth-child(6)");

  // Target all cells in the "실적" column
  var cells_5 = $("table.headergrid1 td:nth-child(5)");

  // Iterate through each cell and replace null values with 0
  cells_6.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });

  cells_5.each(function () {
    var value = $(this).text();
    if (value === "" || value === null || value.trim() === "") {
      $(this).text("0");
    }
  });

  // Target all rows in the table
  var rows = $("table.headergrid1 tbody tr");

  // Iterate through each row
  rows.each(function () {
    // Get cells for 실적, 단가, and 금액
    var siljeokCell = $(this).find("td:nth-child(6)"); // Adjust index if needed

    var dangaCell = $(this).find("td:nth-child(7)"); // Adjust index if needed

    var geumakCell = $(this).find("td:nth-child(8)"); // Adjust index if needed

    // Get numerical values from 실적 and 단가
    var siljeok = parseFloat(siljeokCell.text().replace(/,/g, "")); // Remove commas
    console.log(siljeok);
    var danga = parseFloat(dangaCell.text().replace(/,/g, "")); // Remove commas

    // Calculate 금액 and format with commas
    var geumak = siljeok * danga;
    geumak = geumak.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });

    // Update 금액 cell with formatted value
    geumakCell.text(geumak);
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
});
