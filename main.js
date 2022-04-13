const util = require("./bsl_util");

const BeatmapContext = util.BeatmapContext;

/** +++++++++++++++++++++++++++++++++++++++++++ */

var ctx = new BeatmapContext("NormalLawless.dat");
/*************************************************/

// start here ...
/**

example: 
ctx.EV(0, EVENT_TYPE.BIG_RINGS, LIGHT_TYPE.ON, ctx.RGB(1, 1, 1));

**/

/*************************************************/
ctx.save();