import React from "react";
import RNCalendarEvents, { Calendar } from 'react-native-calendar-events';
import { NativeModules } from "react-native";

class CalendarHelper{
    constructor(){

    }
    //

    addEventToCalendar = (title:string, description:string, location:string, startTime:Date, endTime:Date) => {
        const {CalendarModule} = NativeModules;
        // console.log("start: " + startTime);
        // console.log("end: " + endTime);
        CalendarModule.addEvent(
          title,
          description,
          location,
          Number(endTime),
          Number(endTime),
          5,
          (successMessage:string) => {
            console.log(successMessage); // Event added successfully
          },
          (errorMessage) => {
            console.log(errorMessage); // Error occurred
          }
        );
      };



}
export default new CalendarHelper;