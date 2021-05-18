/*@preserve mastersoft-address-magento*/
define(["jquery","jquery/ui","harmony","domReady!"],function($){"use strict";function wait(){window.Harmony&&$('[name="'+country+'"]').length?(clearTimeout(timeoutVar),init(),country&&$(getFieldSelector(addressForm,country))&&$(getFieldSelector(addressForm,country)).val()&&(selectedCountry=$(getFieldSelector(addressForm,country)).val(),main(selectedCountry))):(timeoutVar=setTimeout(wait,1e3),console.info("Waiting for knockout and Harmony"))}function getFieldSelector(e,o){if("undefined"==typeof o&&console.warn("Encountered undefined field for "+addressForm),o.startsWith("#"))return o;if(e.startsWith("#"))return e+' [name="'+o+'"]';var t=o.replace("[",".").replace("]","");return'div[name="'+e+"."+t+'"] [name="'+o+'"]'}function getAdminConfigs(){var map={username:void 0,password:void 0,url:void 0,AU:{locale:Harmony.AUSTRALIA,sot:void 0,featureOptions:{}},NZ:{locale:Harmony.NEW_ZEALAND,sot:void 0,featureOptions:{}}},key=$("#keyConfig").val().trim(),url=$("#urlConfig").val().trim(),options=$("#optionsConfig").val().trim(),optionsAu=$("#optionsAuConfig").val().trim(),optionsNz=$("#optionsNzConfig").val().trim();if("undefined"!=typeof key&&key&&key.indexOf(":")>0){var i=key.indexOf(":"),username=key.substring(0,i),password=key.substring(i+1,key.length);if(username&&password){map.username=username,map.password=password,"undefined"!=typeof url&&url&&(map.url=url);var value,obj;"undefined"!=typeof options&&options&&(obj=eval("(["+options+"])")[0],Object.keys(obj).forEach(function(e){value=obj[e],"sot"!=e&&(map.AU.featureOptions[e]=value,map.NZ.featureOptions[e]=value)})),"undefined"!=typeof optionsAu&&optionsAu&&(obj=eval("(["+optionsAu+"])")[0],Object.keys(obj).forEach(function(e){value=obj[e],"sot"==e?map.AU.sot=value:map.AU.featureOptions[e]=value})),"undefined"!=typeof optionsNz&&optionsNz&&(obj=eval("(["+optionsNz+"])")[0],Object.keys(obj).forEach(function(e){value=obj[e],"sot"==e?map.NZ.sot=value:map.NZ.featureOptions[e]=value}))}}return console.info("URL: "+url+", Options: "+options+", AU Options: "+optionsAu+", NZ Options: "+optionsNz),map}function init(){populateFields(),configs=getAdminConfigs(),configs.AU.regions={ACT:"Australian Capital Territory",NSW:"New South Wales",NT:"Northern Territory",QLD:"Queensland",SA:"South Australia",TAS:"Tasmania",VIC:"Victoria",WA:"Western Australia"}}function populateFields(){$('[name="street[0]"]').length?(line1="street[0]",line2="street[1]",$('div[name="'+shippingAddressPrefix+'"]').length?addressForm=shippingAddressPrefix:$('div[name="'+billingAddressPrefix+'"]').length&&(addressForm=billingAddressPrefix)):$("#street_1").length&&(line1="#street_1",line2="#street_2",addressForm=customerAddressForm),city="city",region="region",postcode="postcode",refreshFields()}function getRegionField(){var e=$(getFieldSelector(addressForm,"region_id")+" option").last().val();return"undefined"!=typeof e&&e?"region_id":"region"}function refreshFields(){region=getRegionField()}function onChangeCountry(e,o){addressForm=e,selectedCountry=$(getFieldSelector(e,o)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&(refreshFields(),$(getFieldSelector(e,line1)).val(""),$(getFieldSelector(e,line2)).val(""),$(getFieldSelector(e,city)).val(""),$(getFieldSelector(e,region)).val(""),$(getFieldSelector(e,postcode)).val(""),main(selectedCountry))}function main(e){function o(e,o,t,n,r,i){function s(e,o){$(e).val(l(o)),$(e).trigger("keyup"),$(getFieldSelector(addressForm,city)).val(a(n,o)),$(getFieldSelector(addressForm,city)).trigger("keyup");var t=c(n,o);"region_id"==region?($(getFieldSelector(addressForm,region)+" option:contains("+t+")").attr("selected","selected"),$(getFieldSelector(addressForm,region)).trigger("change")):"region"==region&&($(getFieldSelector(addressForm,region)).val(t),$(getFieldSelector(addressForm,region)).trigger("keyup")),$(getFieldSelector(addressForm,postcode)).val(o.postcode),$(getFieldSelector(addressForm,postcode)).trigger("keyup")}function d(e,o){for(var t=[],n=0;n<e.length;n++)"undefined"!=typeof e[n]&&e[n]&&e[n].trim()&&t.push(e[n]);return t.join(o)}function l(e){return d([e.building,e.subdwelling,e.postal,e.street],", ")}function a(e,o){return e==Harmony.AUSTRALIA?o.locality:e==Harmony.NEW_ZEALAND?o.suburb?o.suburb:o.townCity:void 0}function c(e,o){return e==Harmony.AUSTRALIA?configs.AU.regions[o.state.toUpperCase()]:e==Harmony.NEW_ZEALAND?o.townCity.toUpperCase():void 0}Harmony.useEnv(e),Harmony.init(o,t,n),Harmony.useProtocol(Harmony.JSONP),Harmony.useFeatureOptions(i),$(getFieldSelector(addressForm,line1)).autocomplete({minLength:3,delay:500,source:function(e,o){Harmony.address({fullAddress:e.term},r,function(e){var t=[];e.status==Harmony.SUCCESS?(t=$.map(e.payload,function(e){return{label:e.fullAddress,building:e.buildingName,subdwelling:e.subdwelling,street:e.streetNumber+" "+e.street,postal:e.postal,locality:e.locality,state:e.state,suburb:e.suburb,townCity:e.townCity,postcode:e.postcode}}),o(t)):e.messages&&e.messages.length>0?console.info(e.messages[0]):console.info("Request is not successful. Please contact admin.")})},open:function(e,o){var t=$("<img />",{src:LOGO_SRC,alt:"",align:"right"});t.click(function(){$(e.target).autocomplete("close")}),$(this).autocomplete("widget").append(t),$(this).autocomplete("widget").zIndex(4e3)},focus:function(e,o){e.preventDefault()},select:function(e,o){e.preventDefault(),Harmony.transaction(r),refreshFields(),s(this,o.item)}})}var t,n,r=void 0;e&&configs&&!isEmpty(configs)&&"undefined"!=typeof configs[e]&&configs[e]&&(t=configs[e.toUpperCase()].locale,n=configs[e.toUpperCase()].sot,r=configs[e.toUpperCase()].featureOptions);var i=configs.username,s=configs.password,d=configs.url;"undefined"!=typeof t&&t&&"undefined"!=typeof n&&n&&"undefined"!=typeof i&&i&&"undefined"!=typeof s&&s?($(getFieldSelector(addressForm,line1)).autocomplete({disabled:!1}),o(d,i,s,t,n,r)):$(getFieldSelector(addressForm,line1)).autocomplete({disabled:!0})}function printout(e,o){console.log(o+"=");var t=0;$.each(e,function(e,o){if("Object"==typeof o||o instanceof Object)printout(o,e);else{t+=2;for(var n="",r=0;r<t;r++)n+=" ";console.log(n+e+": "+o),t-=2}})}function isEmpty(e){for(var o in e)return!e.hasOwnProperty(o);return!0}console.info("jquery version "+$.fn.jquery),$.ui?console.info("jquery ui is loaded - version "+$.ui.version):console.warn("jquery ui is NOT loaded");var LOGO_SRC="https://s3-ap-southeast-2.amazonaws.com/common.mastersoftgroup.com/styles/images/mastersoft/mastersoft-clear-logo.png",configs,addressForm="",line1,line2,city,region,postcode,shippingAddressPrefix="shippingAddress",billingAddressPrefixBase="billingAddress",billingAddressMOPrefix="billingAddresscheckmo",billingAddressPOPrefix="billingAddresspurchaseorder",billingAddressBTPrefix="billingAddressbanktransfer",billingAddressCODPrefix="billingAddresscashondelivery",billingAddressBraintreePrefix="billingAddressbraintree",billingAddressPrefix=billingAddressPrefixBase,customerAddressForm="#form-validate",billingAddressChk='[name="billing-address-same-as-shipping"]',country="country_id",timeoutVar,selectedCountry;wait(),$(document).on("click",".action-show-popup",function(){populateFields(),selectedCountry=$(getFieldSelector(addressForm,country)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&main(selectedCountry)}),$(document).on("change",".payment-method._active",function(){var e=$('.payment-method._active input[name="payment[method]"]').attr("id");billingAddressPrefix=billingAddressPrefixBase+e,addressForm=billingAddressPrefix}),$(document).on("change",getFieldSelector(shippingAddressPrefix,country),function(){addressForm=shippingAddressPrefix,selectedCountry=$(getFieldSelector(shippingAddressPrefix,country)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&(refreshFields(),$(getFieldSelector(shippingAddressPrefix,line1)).val(""),$(getFieldSelector(shippingAddressPrefix,line2)).val(""),$(getFieldSelector(shippingAddressPrefix,city)).val(""),$(getFieldSelector(shippingAddressPrefix,region)).val(""),$(getFieldSelector(shippingAddressPrefix,postcode)).val(""),main(selectedCountry))}),$(document).on("change",getFieldSelector(billingAddressCODPrefix,country),function(){onChangeCountry(billingAddressCODPrefix,country)}),$(document).on("change",getFieldSelector(billingAddressBTPrefix,country),function(){onChangeCountry(billingAddressBTPrefix,country)}),$(document).on("change",getFieldSelector(billingAddressPOPrefix,country),function(){onChangeCountry(billingAddressPOPrefix,country)}),$(document).on("change",getFieldSelector(billingAddressMOPrefix,country),function(){onChangeCountry(billingAddressMOPrefix,country)}),$(document).on("change",getFieldSelector(billingAddressBraintreePrefix,country),function(){onChangeCountry(billingAddressBraintreePrefix,country)}),$(document).on("change",getFieldSelector(customerAddressForm,country),function(){addressForm=customerAddressForm,selectedCountry=$(getFieldSelector(customerAddressForm,country)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&(refreshFields(),$(getFieldSelector(customerAddressForm,line1)).val(""),$(getFieldSelector(customerAddressForm,line2)).val(""),$(getFieldSelector(customerAddressForm,city)).val(""),$(getFieldSelector(customerAddressForm,region)).val(""),$(getFieldSelector(customerAddressForm,postcode)).val(""),main(selectedCountry))}),$(document).on("change",billingAddressChk,function(){var e=$(billingAddressChk).prop("checked");e?main(void 0):(addressForm=billingAddressPrefix,selectedCountry=$(getFieldSelector(addressForm,country)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&main(selectedCountry))}),$(window).bind("hashchange",function(){var e=window.location.pathname,o=window.location.hash;"/checkout/"==e&&"#payment"==o?addressForm=billingAddressPrefix:"/checkout/"==e&&"#shipping"==o&&(addressForm=shippingAddressPrefix),selectedCountry=$(getFieldSelector(addressForm,country)).val(),selectedCountry&&"undefined"!=typeof selectedCountry&&main(selectedCountry)})});