/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (int ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */

'use strict';

//Function to load js dynamically;
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}


function getJSONMessage(message) {
    return {
        "editable": true,
        "gnetId": null,
        "graphTooltip": 0,
        "id": null,
        "links": [],
        "panels": [
            {
                "content": "\n# Error loading dashboard.\n\n" + message + "\n\n\n\n",
                "datasource": null,
                "gridPos": {
                    "h": 9,
                    "w": 12,
                    "x": 0,
                    "y": 0
                },
                "id": 2,
                "mode": "markdown",
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "type": "text"
            }
        ],
        "schemaVersion": 22,
        "style": "dark",
        "timezone": "",
        "title": "Governify - Grafana",
        "uid": null,
        "variables": {
            "list": []
        },
        "version": 0
    }
}


// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

return function (callback) {
    var url = ARGS.dashboardURL;
    if (!url) {
        callback(getJSONMessage("Dashboard URL param not specified."))
        return;
    }


    //Load agreement and pass it to the dashboardGenerator (URL of generator is stored in the agreement)
    $.ajax({
        method: 'GET',
        url: url
    })
        .done(function (dashboard) {
            callback(dashboard);
        })
        .fail(function ($xhr) {
            console.log($xhr.responseText)

            // Return dashboard
            callback(getJSONMessage("Error when retrieving the agreement: " + $xhr.responseText));
        });
}




