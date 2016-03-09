/*
    
    
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/NL');

var DAYS_OFFSET = { 'zondag': 0, 'zon': 0, 'maandag': 1, 'ma': 1,'dinsdag': 2, 'di':2, 'woensdag': 3, 'woe': 3,
        'donderdag': 4, 'do': 4, 'don': 4,'vrijdag': 5, 'vr': 5,'zaterdag': 6, 'za': 6, 'zat': 6}
    
var PATTERN = new RegExp('(\\W|^)' +
        '(?:(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zon|ma|di|woe|don|do|vr|za|zat)\\s*,?\\s*)?' +
        '([0-9]{1,2})(?:ste|e|de)?' +
        '(?:\\s*(?:tot|\\-|\\–|tot|\\s)\\s*([0-9]{1,2})(?:st|e|de)?)?\\s*(?:van)?\\s*' +
        '(jan(?:uari|\\.)?|feb(?:ruari|\\.)?|ma(?:art|\\.)?|apr(?:il|\\.)?|Mei|jun(?:i|\\.)?|jul(?:i|\\.)?|aug(?:ustus|\\.)?|sep(?:tember|\\.)?|oct(?:ober|\\.)?|nov(?:ember|\\.)?|dec(?:ember|\\.)?)' +
        '(?:(\\s*[0-9]{2,4}(?![^\\s]\\d))(\\s*BE)?)?' + 
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function NLMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){ 
                //BC
                year = year - 543;

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){  
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){ 
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }
        
        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['NLMonthNameLittleEndianParser'] = true;
        return result;
    };
}

