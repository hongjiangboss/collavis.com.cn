function topSearch() {

}

var navStatus = 0;
jQuery(document).ready(function () {
  jQuery('#GNB_in .h-gnb').mouseover(function () {
    jQuery('#gnb_over').show();
    navStatus = 1;
  });
  jQuery('#gnb_over').mouseover(function () {
    jQuery('#gnb_over').show();
    navStatus = 2;
  });
  jQuery('#gnb_over').mouseleave(function () {
    if (navStatus == 2) {
      jQuery('#gnb_over').fadeOut('fast');
      navStatus = 0;
    }
  });
});
