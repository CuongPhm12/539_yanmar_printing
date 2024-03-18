$("#save_btn").click(function () {
  $("#header-checkrow").trigger("click");
});
$("#search_btn").trigger("click");

$("#print_btn").hide();
$("#excelupload1").hide();
$("#del_btn").hide();
$("#detail-addrow").hide();
$("#detail-delrow").hide();

$("#" + itmobj1["prod_type1_ser"]).select2();
$("#" + itmobj1["carcass_cd_ser"]).select2();

//for printing
$("#reset_btn")
  .after(`<div class="right-tap-btn ajaxset" id="print_btn_custom" style="">
                <span class="right-btn-text">PRODUCTION RESULT REPORT</span></div>`);
