import {
    dateToIndex,
    indexesToValues,
    makeAmList,
    makeDateList,
    makeHoursList,
    makeMinutesList,
    makeTimeLists,
    normalizeDate,
    normalizeMinMaxDates,
    timeToIndexes
} from "../utils";

describe( "date-picker/utils", () => {

    describe( "normalizeMinMaxDates", () => {

        it( "works when minimumDate equals maximumDate", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ) )
            ).toMatchSnapshot()
        } );

        it( "works when minimumDate less than maximumDate", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

        it( "works when both minimumDate and maximumDate are not provided", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10, 13, 27 ), null, null )
            ).toMatchSnapshot()
        } );

        it( "works when maximumDate is not provided", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ), null )
            ).toMatchSnapshot()
        } );

        it( "works when minimumDate is not provided and maximumDate earlier than given date", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), null, new Date( 2018, 9, 1 ) )
            ).toMatchSnapshot()
        } );

        it( "works when minimumDate is not provided and maximumDate later than given date", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), null, new Date( 2018, 9, 20 ) )
            ).toMatchSnapshot()
        } );

        it( "works when minimumDate is grater than maximumDate", () => {
            expect(
                normalizeMinMaxDates( new Date( 2018, 9, 10 ), new Date( 2018, 10, 20 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

    } );

    describe( "normalizeDate", () => {

        it( "works when date equals minimumDate equals maximumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ) )
            ).toMatchSnapshot()
        } );

        it( "works when date equals minimumDate and less than maximumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 9, 10 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

        it( "works when date equals maximumDate and greater than minimumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 9, 15 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

        it( "works when date is between maximumDate and minimumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 9, 12 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

        it( "works when date is less than minimumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 8, 12 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );


        it( "works when date is greater than maximumDate", () => {
            expect(
                normalizeDate( new Date( 2018, 10, 12 ), new Date( 2018, 9, 10 ), new Date( 2018, 9, 15 ) )
            ).toMatchSnapshot()
        } );

    } );

    describe( "makeAmList", () => {
        it( "works", () => {
            expect( makeAmList() ).toMatchSnapshot();
        } )
    } );

    describe( "makeHoursList", () => {

        it( "works for 24 with leading zeroes", () => {
            expect( makeHoursList( false, true ) ).toMatchSnapshot();
        } );

        it( "works for 24 without leading zeroes", () => {
            expect( makeHoursList( false, false ) ).toMatchSnapshot();
        } );

        it( "works for AM/PM", () => {
            expect( makeHoursList( true, false ) ).toMatchSnapshot();
        } );

    } );

    describe( "makeMinutesList", () => {
        [ 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 ]
            .forEach( minuteInterval => {
                it( `works for every ${minuteInterval} minute`, () => {
                    expect( makeMinutesList( minuteInterval ) ).toMatchSnapshot();
                } );
            } );

    } );

    describe( "makeTimeLists", () => {

        it( "works for 1 min en", () => {
            expect( makeTimeLists( 1, "en" ) ).toMatchSnapshot();
        } );

        it( "works for 5 min fr", () => {
            expect( makeTimeLists( 5, "fr" ) ).toMatchSnapshot();
        } );

        it( "works for 10 min ru", () => {
            expect( makeTimeLists( 10, "ru" ) ).toMatchSnapshot();
        } );

    } );

    describe( "timeToIndexes", () => {

        [
            "0:00",
            "0:03",
            "1:10",
            "6:31",
            "11:55",
            "12:00",
            "12:03",
            "18:31",
            "23:55"
        ].forEach( time => {
            const parsed = time.split( ":" ).map( v => +v );
            const date = new Date( 2018, 9, 1, parsed[ 0 ], parsed[ 1 ] );

            [
                [ 1, "en" ],
                [ 5, "fr" ],
                [ 10, "ru" ]
            ].forEach( props => {
                it( `works for ${time} in ${props.join( " min " )}`, () => {
                    expect( timeToIndexes( date, makeTimeLists( ...props ) ) ).toMatchSnapshot();
                } );

            } )

        } );

    } );


    describe( "indexesToValues", () => {

        [
            "0:00",
            "0:03",
            "1:10",
            "6:31",
            "11:55",
            "12:00",
            "12:03",
            "18:31",
            "23:55"
        ].forEach( time => {
            const parsed = time.split( ":" ).map( v => +v );
            const date = new Date( 2018, 9, 1, parsed[ 0 ], parsed[ 1 ] );

            [
                [ 1, "en" ],
                [ 5, "fr" ],
                [ 10, "ru" ]
            ].forEach( props => {
                it( `works for ${time} in ${props.join( " min " )}`, () => {
                    const lists = makeTimeLists( ...props );
                    const indexes = timeToIndexes( date, lists );
                    expect( indexesToValues( indexes, lists ) ).toMatchSnapshot();
                } );

            } )

        } );

    } );

    describe( "makeDateList", () => {

        it( "works when maximumDate equals minimumDate equals TODAY", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 10 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 10 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when maximumDate equals minimumDate and doesn't equal TODAY", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 1 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 10 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when TODAY equals minimumDate and less than maximumDate", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 10 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when TODAY equals maximumDate and greater than minimumDate", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 15 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when TODAY is between minimumDate and maximumDate", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 12 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when minimumDate and maximumDate are in adjacent months of the same year", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 1 ),
                minimumDate: new Date( 2018, 9, 27 ),
                maximumDate: new Date( 2018, 10, 2 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when minimumDate and maximumDate are in adjacent years", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 1 ),
                minimumDate: new Date( 2018, 11, 28 ),
                maximumDate: new Date( 2019, 0, 2 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when minimumDate and maximumDate are in Feb and Mar", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 1 ),
                minimumDate: new Date( 2019, 1, 26 ),
                maximumDate: new Date( 2019, 2, 2 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works when minimumDate and maximumDate are in leap Feb and Mar", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 1 ),
                minimumDate: new Date( 2020, 1, 26 ),
                maximumDate: new Date( 2020, 2, 2 ),
                locale: "en"
            } ) ).toMatchSnapshot();
        } );

        it( "works for fr", () => {
            expect( makeDateList( {
                todayDate: new Date( 2018, 9, 12 ),
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
                locale: "fr"
            } ) ).toMatchSnapshot();
        } );

    } );

    describe( "dateToIndex", () => {

        it( "works when date equals minimumDate and maximumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 10 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 10 ), list ) ).toMatchSnapshot()
        } );


        it( "works when date equals minimumDate and less than maximumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 10 ), list ) ).toMatchSnapshot()
        } );

        it( "works when date equals maximumDate and greater than minimumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 15 ), list ) ).toMatchSnapshot()
        } );

        it( "works when date is between maximumDate and minimumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 12 ), list ) ).toMatchSnapshot()
        } );

        it( "works when date is less than maximumDate and minimumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 1 ), list ) ).toMatchSnapshot()
        } );

        it( "works when date is greater than maximumDate and minimumDate", () => {
            const list = makeDateList( {
                minimumDate: new Date( 2018, 9, 10 ),
                maximumDate: new Date( 2018, 9, 15 ),
            } );
            expect( dateToIndex( new Date( 2018, 9, 20 ), list ) ).toMatchSnapshot()
        } );

    } );

} );
