/* Modified to suit nodeunit
 * Downloaded via
 * http://maps.googleapis.com/maps/api/js?key=AIzaSyAD0DuFfwB-m7JYCejyWCwkVFrRIvyH3RE&sensor=false&libraries=places&region=HK
 *
 */

window.google = window.google || {};
google.maps = google.maps || {};
(function() {

    //wipe original data
    function getScript(src) {
        var script = document.createElement('script')
        script.src = src;
        // now append the script into HEAD, it will fetched and executed
        document.documentElement.firstChild.appendChild(script)
        // document.write('<' + 'script src="' + src + '"' + ' type="text/javascript"><' + '/script>');
    }

    var modules = google.maps.modules = {};
    google.maps.__gjsload__ = function(name, text) {
        modules[name] = text;
    };

    google.maps.Load = function(apiLoad) {
        delete google.maps.Load;
        apiLoad([0.009999999776482582, [[["http://mt0.googleapis.com/vt?lyrs=m@210000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=m@210000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "m@210000000"], [["http://khm0.googleapis.com/kh?v=126\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=126\u0026hl=en-US\u0026"], null, null, null, 1, "126"], [["http://mt0.googleapis.com/vt?lyrs=h@210000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=h@210000000\u0026src=api\u0026hl=en-US\u0026"], null, null, "imgtp=png32\u0026", null, "h@210000000"], [["http://mt0.googleapis.com/vt?lyrs=t@130,r@210000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=t@130,r@210000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "t@130,r@210000000"], null, null, [["http://cbk0.googleapis.com/cbk?", "http://cbk1.googleapis.com/cbk?"]], [["http://khm0.googleapis.com/kh?v=73\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=73\u0026hl=en-US\u0026"], null, null, null, null, "73"], [["http://mt0.googleapis.com/mapslt?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["http://mt0.googleapis.com/vt?hl=en-US\u0026", "http://mt1.googleapis.com/vt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/loom?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/loom?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]]], ["en-US", "HK", null, 0, null, null, "http://maps.gstatic.com/mapfiles/", "http://csi.gstatic.com", "https://maps.googleapis.com", "http://maps.googleapis.com"], ["http://maps.gstatic.com/intl/en_us/mapfiles/api-3/12/6", "3.12.6"], [354860651], 1.0, null, null, null, null, 0, "", ["places"], null, 0, "http://khm.googleapis.com/mz?v=126\u0026", "AIzaSyAD0DuFfwB-m7JYCejyWCwkVFrRIvyH3RE", "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null, "http://mt.googleapis.com/vt/icon"], loadScriptTime);
    };
    var loadScriptTime = (new Date).getTime();
    getScript("http://maps.gstatic.com/cat_js/intl/en_us/mapfiles/api-3/12/6/%7Bmain,places%7D.js");
})();
