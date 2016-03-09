
test("NL - Test - Single Expression", function() {


    var text = "De deadline is nu";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 8, 9, 10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'nu', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 9, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 10, 'Test Result - (Second) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 9, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "De deadline is vandaag";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'vandaag', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "De deadline is morgen";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'morgen', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    // Say.."Tomorrow" in the late night (1 AM)
    var text = "De deadline is morgen";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 1));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was gisteren";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'gisteren', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was gisteren avond ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'gisteren avond', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 0, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was deze ochtend ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'deze ochtend', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 6, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was deze namiddag ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'deze namiddag', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 15, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 15);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was deze avond ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'deze avond', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 18, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Combined Expression", function() {


    var text = "The Deadline is vandaag om 17 uur";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'vandaag om 17 uur', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test('Test - Random text', function() {

    var text = "vanavond";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text)
    ok(result.start.get('year') == 2012, JSON.stringify(result.start))
    ok(result.start.get('month') == 1, JSON.stringify(result.start))
    ok(result.start.get('day') == 1, JSON.stringify(result.start))
    ok(result.start.get('hour') == 22, JSON.stringify(result.start))
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start))

    var text = "vanavond 20 uur";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text)
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start))
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start))
    ok(result.start.get('month') == 1, JSON.stringify(result.start))
    ok(result.start.get('day')   == 1, JSON.stringify(result.start))
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start))


    var text = "vanavond om 8";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text)
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start))
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start))
    ok(result.start.get('month') == 1, JSON.stringify(result.start))
    ok(result.start.get('day')   == 1, JSON.stringify(result.start))
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start))


    var text = "don";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
    ok(result.start.get('weekday') == 4, result.text)


    var text = "do";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text)
    ok(result.start.get('weekday') == 4, result.text)
})


test('Test - Random negative text', function() {

    var text = "nietvandaag";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )


    var text = "vndee";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "sgistern";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "nergens";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "noway";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "knowledge";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

})
