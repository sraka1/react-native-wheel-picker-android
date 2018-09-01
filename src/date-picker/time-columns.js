import Column from "./column";
import { makeTimeLists, indexesToValues, timeToIndexes } from "./utils";

import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";

export default class TimeColumns extends PureComponent {

    static propTypes = {
        timeOnly: PropTypes.bool.isRequired,
        date: PropTypes.instanceOf( Date ).isRequired,
        minuteInterval: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        styles: PropTypes.object.isRequired,
        locale: PropTypes.string
    };

    static getDerivedStateFromProps( props, state ) {
        const { date, minuteInterval, locale } = props;
        if ( state.date && state.date.valueOf() === date.valueOf() )
            return null;

        const lists = makeTimeLists( minuteInterval, locale );
        const indexes = timeToIndexes( date, lists );

        return { date, indexes, lists };
    }

    constructor( props, ...args ) {
        super( props, ...args );
        this.state = {};
    }

    render() {
        const { timeOnly, styles } = this.props;
        const { indexes, lists } = this.state;
        const format24 = !lists.am;
        return (
            <Fragment>
                <Column
                    style={ [ styles.picker, styles.hours ] }
                    isCyclic
                    itemTextAlign={ timeOnly ? "right" : "center" }
                    onItemSelected={ this.onHourSelected }
                    list={ lists.hours }
                    selectedItemPosition={ indexes.hours }
                />
                <Column
                    style={ [ styles.picker, styles.minutes, format24 && styles.gap ] }
                    isCyclic
                    itemTextAlign={ format24 ? "left" : "center" }
                    onItemSelected={ this.onMinuteSelected }
                    list={ lists.minutes }
                    selectedItemPosition={ indexes.minutes }
                />
                { !format24 && this.renderAm() }
            </Fragment>
        )
    }

    renderAm( visibleItemCount ) {
        const { styles } = this.props;
        const { indexes, lists } = this.state;
        return (
            <Column
                style={ [ styles.picker, styles.AM ] }
                visibleItemCount={ visibleItemCount }
                onItemSelected={ this.onAmSelected }
                list={ lists.am }
                selectedItemPosition={ indexes.am }
            />
        )
    }

    onHourSelected = ( event ) => {
        this.onTimeSelected( { hours: event.position } )
    };

    onMinuteSelected = ( event ) => {
        this.onTimeSelected( { minutes: event.position } )
    };

    onAmSelected = ( event ) => {
        this.onTimeSelected( { am: event.position } )
    };

    onTimeSelected( changedIndexes ) {
        const indexes = Object.assign( {}, this.state.indexes, changedIndexes );
        const values = indexesToValues( indexes, this.state.lists );
        this.setState( { indexes }, () => this.props.onChange( values ) );
    }

};
