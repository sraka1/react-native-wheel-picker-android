/**
 * @prettier
 * @flow
 * */

import React from "react"
import { View } from "react-native"
import WheelPicker from "./wheel-picker"
import {
    hourTo24Format,
    hourTo12Format,
    pickerDateArray,
    getHoursArray,
    increaseDateByDays,
    getFiveMinutesArray,
    getAmArray
} from "./Utils"

import styles from "./styles";

const millisecondsPerDay = 1000 * 60 * 60 * 24;

type Event = {
    data: string | number,
    position: number,
}

type Props = {
    initDate: string,
    onTimeSelected: Date => void,
    hours: Array<number>,
    minutes: Array<string>,
    format24: boolean,
    onDateSelected: Date => void,
    startDate: string,
    daysCount: number,
    days: Array<number>,
}

type State = {
    selectedDate: Date,
    daysAfterSelectedDate: number,
    initDayInex: number,
    initHourInex: number,
    initMinuteInex: number,
    initAmInex: number,
}

export default class DatePicker extends React.Component<Props, State> {
    constructor( props: Props ) {
        super( props )
        const { startDate } = props
        const selectedDate = this.props.initDate
            ? new Date( this.props.initDate )
            : new Date()
        const time12format = hourTo12Format( selectedDate.getHours() )
        const time24format = selectedDate.getHours()
        const millisBetween = selectedDate.getTime() - new Date().getTime()
        let millisBetweenStartDate
        let daysStartDate = 0
        if ( startDate ) {
            millisBetweenStartDate =
                new Date( startDate ).getTime() - new Date().getTime()
            daysStartDate = millisBetweenStartDate / millisecondsPerDay
        }
        const days = millisBetween / millisecondsPerDay
        const daysAfterSelectedDate = Math.round( daysStartDate )
        const initDayInex = startDate
            ? Math.round( days ) - Math.round( daysStartDate )
            : Math.round( days )
        const initHourInex = this.props.format24
            ? time24format
            : Number( time12format[ 0 ] ) - 1
        const initMinuteInex = Math.round( selectedDate.getMinutes() / 5 )
        const initAmInex = time12format[ 1 ] === "AM" ? 0 : 1

        this.state = {
            daysAfterSelectedDate,
            initDayInex,
            selectedDate,
            initHourInex,
            initMinuteInex,
            initAmInex
        }
    }

    render() {
        const { startDate, days, daysCount, hours, minutes, format24, visibleItemCount = 6 } = this.props;
        const { initHourInex, initDayInex, initMinuteInex } = this.state;
        return (
            <View style={ styles.container }>
                <WheelPicker
                    style={ [ styles.picker, styles.date ] }
                    isAtmospheric
                    isCurved
                    itemTextAlign="right"
                    visibleItemCount={ visibleItemCount }
                    data={ days || pickerDateArray( startDate, daysCount ) }
                    selectedItemTextColor={ "black" }
                    onItemSelected={ this.onDaySelected }
                    selectedItemPosition={ initDayInex }
                />
                <WheelPicker
                    style={ [ styles.picker, styles.hours, styles.gap ] }
                    isAtmospheric
                    isCyclic
                    isCurved
                    itemTextAlign="center"
                    visibleItemCount={ visibleItemCount }
                    data={ hours || getHoursArray( format24 ) }
                    selectedItemTextColor={ "black" }
                    onItemSelected={ this.onHourSelected }
                    selectedItemPosition={ initHourInex }
                />
                <WheelPicker
                    style={ [ styles.picker, styles.minutes ] }
                    isAtmospheric
                    isCyclic
                    isCurved
                    itemTextAlign="left"
                    visibleItemCount={ visibleItemCount }
                    data={ minutes || getFiveMinutesArray() }
                    selectedItemTextColor={ "black" }
                    onItemSelected={ this.onMinuteSelected }
                    selectedItemPosition={ initMinuteInex }
                />
                { !format24 && this.renderAm( visibleItemCount ) }
            </View>
        )
    }

    renderAm( visibleItemCount ) {
        const { initAmInex } = this.state
        return (
            <WheelPicker
                style={ [ styles.picker, styles.AM ] }
                isAtmospheric
                isCurved
                itemTextAlign="left"
                visibleItemCount={ visibleItemCount }
                data={ getAmArray() }
                selectedItemTextColor={ "black" }
                onItemSelected={ this.onAmSelected }
                selectedItemPosition={ initAmInex }
            />
        )
    }

    onDaySelected = ( event: Object ) => {
        let selectedDate = this.state.selectedDate
        const daysAfterSelectedDate = this.state.daysAfterSelectedDate
        const hours = selectedDate.getHours()
        const minutes = selectedDate.getMinutes()
        if ( event.data === "Today" ) {
            selectedDate = new Date()
        } else {
            selectedDate = increaseDateByDays(
                new Date(),
                this.props.startDate
                    ? daysAfterSelectedDate + event.position
                    : event.position
            )
        }
        selectedDate.setHours( hours )
        selectedDate.setMinutes( minutes )
        this.onDateSelected( selectedDate )
    }

    onHourSelected = ( event: Event ) => {
        const selectedDate = this.state.selectedDate
        if ( this.props.format24 ) {
            selectedDate.setHours( Number( event.data ) )
        } else {
            const time12format = hourTo12Format( selectedDate.getHours() )
            const newTime12Format = `${event.data} ${time12format[ 1 ]}`
            const selectedHour24format = hourTo24Format( newTime12Format )
            selectedDate.setHours( selectedHour24format )
        }
        this.onDateSelected( selectedDate )
    }

    onMinuteSelected = ( event: Event ) => {
        const selectedDate = this.state.selectedDate
        selectedDate.setMinutes( Number( event.data ) )
        this.onDateSelected( selectedDate )
    }

    onAmSelected = ( event: Event ) => {
        const selectedDate = this.state.selectedDate
        const time12format = hourTo12Format( selectedDate.getHours() )
        const newTime12Format = `${time12format[ 0 ]} ${event.data}`
        const selectedHour24format = hourTo24Format( newTime12Format )
        selectedDate.setHours( selectedHour24format )
        this.onDateSelected( selectedDate )
    }

    onDateSelected( selectedDate: Date ) {
        if ( this.props.onDateSelected ) {
            this.props.onDateSelected( selectedDate )
        }
    }
}
