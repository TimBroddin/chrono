/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(binnen|in)\s*([0-9]+|een|twee|drie|vier|vijf|tien|vijftien|twintig|dertig|veertig|een?|(?:\s*een ?)?half|(?:\s*een ?)?halve)\s*(minuut?|minuten?|kwartier?|uur?|uren?|dag?|dagen?)\s*(?=(?:\W|$))/i;
var NUMBERS = require('../../utils/NL').NUMBERS;


exports.Parser = function NLDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = match[3];

        if (num === 'een'){
            num = 1;
        } else if (num.match(/half/)) {
            num = 0.5;
        } else {
            if(NUMBERS[num]) {
                num = NUMBERS[num];
            } else {
                num = parseInt(num);
            }

        }

        var date = moment(ref);
        if (match[4].match(/dag/) || match[4].match(/dagen/)) {
            date.add(num, 'd');

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (match[4].match(/uur/) || match[4].match(/uren/)) {

            date.add(num, 'hour');

        } else if (match[4].match(/minuut/) || match[4].match(/minuten/)) {

            date.add(num, 'minute');
        } else if(match[4].match(/kwartier/)) {
            date.add(num*15, 'minute');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.tags['NLDeadlineFormatParser'] = true;
        return result;
    };
}
