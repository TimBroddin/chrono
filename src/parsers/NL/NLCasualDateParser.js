/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(nu|vandaag|vanavond|morgen|mrg|gisteren|gisteren\s*avond|deze\s*(ochtend|middag|namiddag|avond))(?=\W|$)/i;

exports.Parser = function NLCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if(lowerText == 'vanavond'){
            // Normally means this coming midnight
            result.start.imply('hour', 18);
            result.start.imply('meridiem', 1);

        } else if(lowerText == 'morgen' || lowerText == 'mrg'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if(lowerText == 'gisteren') {

            startMoment.add(-1, 'day');
        }
        else if(lowerText.match(/gisteren\s*avond/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("deze")) {

            var secondMatch = match[3].toLowerCase();
            if (secondMatch == "namiddag") {

                result.start.imply('hour', 15);

            } else if (secondMatch == "middag") {

                result.start.imply('hour', 12);

            } else if (secondMatch == "avond") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "ochtend") {

                result.start.imply('hour', 6);
            }

        } else if (lowerText.match("nu")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['NLCasualDateParser'] = true;
        return result;
    }
}
