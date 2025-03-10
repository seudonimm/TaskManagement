import React from "react";
import RNCalendarEvents, { Calendar } from 'react-native-calendar-events';
import { NativeModules } from "react-native";

class CalendarHelper{
    constructor(){

    }
    //

    addEventToCalendar = (title:string, description:string, location:string, startTime:Date, endTime:Date) => {
        const {CalendarModule} = NativeModules;
        console.log("start: " + startTime);
        console.log("end: " + endTime);
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
            console.error(errorMessage); // Error occurred
          }
        );
      };


    requestPermission = async() => {
        try {
            let res = await RNCalendarEvents.requestPermissions();    
            return res; 
        } catch (e) {
            console.log(e);
        }
    }

    findCalendars = async() => {
        try {
            let res = await RNCalendarEvents.findCalendars();  
            return res;  
        } catch (e) {
            console.log(e);
        }
    }

    createCalendar = async(calendar) => {
        try {
            let res = await RNCalendarEvents.saveCalendar(calendar);  
            return res;  
        } catch (e) {
            console.log(e);
        }
    }

    createEvent = async(title:string, details:object, options?:object) => {
        try {
            RNCalendarEvents.saveEvent(title, details, options);
            console.log("event saved");
        } catch (e) {
            console.log(e);
        }
    }

}
export default new CalendarHelper;