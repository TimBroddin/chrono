/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(?:binnen\s*)?([0-9]+|een?|half?|halve?)\s*(minuut?|minuten?|uur?|uren?|week?|weken?|dag?|dagen?|maand?|maanden?|jaar?|jaren?)\s*(?:geleden|terug)(?=(?:\W|$))/i;
var STRICT_PATTERN = /(\W|^)(?:binnen\s*)?([0-9]+|an?)\s*(minuut?|minuten?|uur?|uren?|week?|weken?|dag?|dagen?|maand?|maanden?|jaar?|jaren?)\s*geleden(?=(?:\W|$))/i;

exports.Parser = function NLTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = match[2];
        if(num === 'een'){
            num = 1;
        } else if (num.match(/half/) || num.match(/halve/)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);

        if (match[3].match(/uur/) || match[3].match(/uren/) || match[3].match(/minuut/) || match[3].match(/minuten/)) {
            if (match[3].match(/uur/) || match[3].match(/uren/)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/minuut/) || match[3].match(/minuten/)) {

                date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.tags['NLTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/week/) || match[3].match(/weken/)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/dag/) || match[3].match(/dagen/)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/maand/) || match[3].match(/maanden/)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/jaar/) || match[3].match(/jaren/)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}
