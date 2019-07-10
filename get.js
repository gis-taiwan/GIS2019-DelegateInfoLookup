$('document').ready(function(){
    function getAllUrlParams(url) {
        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        // we'll store the parameters here
        var obj = {};
        // if query string exists
        if (queryString) {
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            // split our query string into its component parts
            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
                // (optional) keep case consistent
                //paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue;//.toLowerCase()
                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {
                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];
                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }
        return obj;
    }
    id = getAllUrlParams().id
    console.log(id);


    $.getJSON( "delegate.json", function( data ) {
        //console.log(data);
        //console.log();
        $('#code').text(id);
        $('#fp').text(data[0][id]);
        $('#ap_t').text(data[1][id]);
        $('#ap_c').text(data[2][id]);
        $('#keynote1').text(data[3][id]);
        $('#keynote2').text(data[4][id]);
        $('#workshop1').text(data[5][id]);
        $('#workshop2').text(data[6][id]);
        $('#cv').text(data[7][id]);
        $('#ld1').html(data[8][id]);
        $('#ld2').html(data[9][id]);
		info = (data[10][id]).split('\n');
		console.log(info)
        $('#ce1').text(info[0]);
        $('#ce2').text(info[1]);
        $('#ce3').text(info[2]);
    });


});

