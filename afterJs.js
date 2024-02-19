var plan_ym = nvl($("#" + itmobj1["ym_ser"]).val(), "");

var plan_month_01 = plan_ym.substring(4, 6);
var plan_year_01 = plan_ym.substring(0, 4);
var maxDays = new Date(plan_year_01, plan_month_01, 0).getDate();

var max = Number(maxDays);
for (var i = 28; i <= 31; i++) {
  if (i <= max) {
    grid1.showColumn(itmobj1["result_qty_" + (i + "").padStart(2, "0")]);
    console.log(itmobj1["result_qty_" + (i + "").padStart(2, "0")]);
  } else {
    console.log(itmobj1["result_qty_" + (i + "").padStart(2, "0")]);
    grid1.hideColumn(itmobj1["result_qty_" + (i + "").padStart(2, "0")]);
  }
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const daysOfWeekArray = []; // 요일만 저장할 배열
for (let day = 1; day <= max; day++) {
  const date = new Date(plan_year_01, plan_month_01 - 1, day);
  const dayOfWeekIndex = date.getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];
  daysOfWeekArray.push(dayOfWeek); // 요일 정보만 배열에 추가
}

for (var i = 1; i <= max; i++) {
  $(
    'th[data-column-name="' +
      itmobj1["result_qty_" + (i + "").padStart(2, "0")] +
      '"]'
  ).html(i + "<br>" + daysOfWeekArray[i - 1]);
}

var gd1 = grid1.getRows();
if (gd1.length > 0) {
  grid1.check(0);

  // 그리드 값이 0일때 투명처리
  $(".tui-grid-cell-content")
    .filter(function () {
      return $(this).text() === "0";
    })
    .css("opacity", "0");
}

grid1.on("check", function (event) {
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["etc1"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i][itmobj1["etc1"]] == value[itmobj1["etc1"]]
        // &&
        // rows[i][itmobj1["readonly_yn"]] == "N"
      )
        grid1.check(i);
    }
  }
});
grid1.on("uncheck", function (event) {
  //   console.log("abc");
  const value = grid1.getRow(event.rowKey);
  if (value[itmobj1["etc1"]]) {
    const rows = grid1.getRows();
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i][itmobj1["etc1"]] == value[itmobj1["etc1"]]
        // &&
        // rows[i][itmobj1["readonly_yn"]] == "N"
      )
        grid1.uncheck(i);
    }
  }
});

//for printing
$("#print_btn_custom").on("click", function (event) {
  //   const selectedRow = grid1.getCheckedRows();

  //   if (selectedRow.length === 1) {
  $("#print_btn").trigger("click");
  //   } else if (selectedRow.length >= 2) {
  //     msg("Cant print if selected row greater than 1 ");
  //     return;
  //   }
  //   if ($("#msgconfirm").is(":visible")) {
  //     $("#msgconfirm").dialog("destroy");
  //   }
});

var height =
  $(".right-content").height() -
  ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
grid1_1.setHeight(height);
