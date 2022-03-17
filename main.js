const fs = require("fs");

var LIGHT_TYPE = {
    OFF: 0,
    ON: 5,
    FLASH: 6,
    FADE: 7
};

var EVENT_TYPE = {
    ROTATION_INCLUDE: 14,  // 0 to 7 => -60° to 60°
    ROTATION_EXCLUDE: 15,  // 0 to 7 => -60° to 60°
    BACK_LASERS: 0,        // light_value
    BIG_RINGS: 1,          // light_value
    LEFT_ROT_LIGHTS: 2,    // light_value
    RIGHT_ROT_LIGHTS: 3,   // light_value
    CENTER_LIGHTS: 4,      // light_value
    RING_ROTATION: 8,      // default 7
    RING_ZOOM: 9,          // default 7
    LEFT_LASER_SPEED: 12,  // int
    RIGHT_LASER_SPEED: 13, // int
    BOOST_LIGHTS: 5,       // 0, 1
};

var ROTATION = {
    N_60: 0,
    N_45: 1,
    N_30: 2,
    N_15: 3,
    P_15: 4,
    P_30: 5,
    P_45: 6,
    P_60: 7
};

function Color() {
    /**
     * 
     * @param {float} r 
     * @param {float} g 
     * @param {float} b 
     * @param {float} a (optional)
     * @returns 
     */
    this.create = function(r, g, b, a) {
        return {
            r: r,
            g: g,
            b: b,
            a: a || 1
        };
    }
}

var COLOR = new Color();

// todo...?
// <<<<
function EventData() {
    this.create = function(time, type, value, color) {
        return {

        };
    };
}

var EVENTDATA = new EventData();
// <<<<

function Event() {
    var events = [];

    this.load = function(data) { events = data._events; };

    /**
     * 
     * @param {float} time 
     * @param {EVENT_TYPE} type 
     * @param {LIGHT_TYPE} light_type 
     * @param {Color} color (optional)
     */
    this.create = function(time, type, light_type, color) {
        var row = {
            _time: time,
            _type: type,
            _value: light_type
        };

        if(color) {
            row._customData = { _color: color };
        }

        events.push(row);
    };

    this.create_light = function(time, type, light_type, color) {

    };

    this.create_single_light = function(time, type, light_type, color) {

    };

    this.collect = function() { return events; };
}

function Map() {
    var file = "";
    var data = null;

    /**
     * 
     * @param {string} filename 
     */
    this.load = function(filename) {
        file = filename;

        let json_file = fs.readFileSync(file);
        data = JSON.parse(json_file);
    };

    this.getData = function() { return data; };

    /**
     * 
     * @param {Event} events 
     */
    this.save = function(events) {
        console.log(data._events);
        data._events = events.collect();
        return; // debug

        try {
            fs.writeFileSync(file, JSON.stringify(data));
        } catch(e) {
            console.log("...could not save file...", e);
        }
    };
}

function BeatmapContext(filename) {
    var map = new Map();
    var events = new Event();

    var global_alpha = null;

    /**
     * 
     * @param {string} p_filename (optional)
     * @returns 
     */
    this.load = function(p_filename) {
        if(p_filename) {
            map.load(p_filename);
            return;
        } else {
            map.load(filename);
        }

        events.load(map.getData());
    };

    this.save = function() {
        map.save(events);
    };

    /************************************/

    // returns an event row
    this.EV   = function(time, type, light_type, color) { events.create(time, type, light_type, color); };
    // returns a light row
    this.L    = function(time, type, light_type, color) { events.create_light(time, type, light_type, color); };
    // returns a light id row
    this.L_ID = function(time, type, light_type, color) { events.create_single_light(time, type, light_type, color); };

    // returns a color
    this.RGB  = function(r, g, b) { return COLOR.create(r, g, b, global_alpha); };
    // returns a color
    this.RGBA = function(r, g, b, a) { return COLOR.create(r, g, b, a); };

    this.ROT_IN = function(time, _) {};
    this.ROT_EX = function(time, _) {};

    this.LASER_BACK = function(time, _) {};

    /************************************/
    this.load();
}

/** +++++++++++++++++++++++++++++++++++++++++++ */

var ctx = new BeatmapContext("NormalLawless.dat");

/*************************************************/



/*************************************************/
ctx.save();