package com.taskmanagement

import android.content.ContentValues
import android.content.Context
import android.provider.CalendarContract
import android.provider.CalendarContract.Reminders
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import android.util.Log

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CalendarModule"
    }

    @ReactMethod
    fun addEvent(
        title: String,
        description: String,
        location: String,
        startTime: Double,
        endTime: Double,
        reminderTime: Int, // Reminder time in minutes before the event
        successCallback: Callback,
        errorCallback: Callback
    ) {
        try {
            // Fetch the calendar ID
            val calendarId = getCalendarId(reactApplicationContext)

            if (calendarId == null) {
                errorCallback.invoke("No calendar found to add the event.")
                return
            }

            // Check if the event already exists
            if (eventExists(reactApplicationContext, title, startTime, endTime)) {
                errorCallback.invoke("Event with the same title and time already exists!")
                return
            }

            // Create the new event
            val values = ContentValues().apply {
                put(CalendarContract.Events.CALENDAR_ID, calendarId)
                put(CalendarContract.Events.TITLE, title)
                put(CalendarContract.Events.DESCRIPTION, description)
                put(CalendarContract.Events.EVENT_LOCATION, location)
                put(CalendarContract.Events.DTSTART, startTime.toLong())
                put(CalendarContract.Events.DTEND, endTime.toLong())
                put(CalendarContract.Events.EVENT_TIMEZONE, "UTC")
            }

            // Insert the event into the calendar
            val uri = reactApplicationContext.contentResolver.insert(CalendarContract.Events.CONTENT_URI, values)

            if (uri != null) {
                // Set reminder for the event using Calendar's built-in reminder system
                val eventId = uri.lastPathSegment?.toLong()

                // Add reminder for the event if event was created successfully
                if (eventId != null) {
                    setEventReminder(reactApplicationContext, eventId, reminderTime)
                }

                successCallback.invoke("Event added successfully with reminder.")
            } else {
                errorCallback.invoke("Failed to add event!")
            }

        } catch (e: Exception) {
            errorCallback.invoke(e.message ?: "Unknown error")
        }
    }

    // Method to get the first available calendar ID (typically Google or default system calendar)
    private fun getCalendarId(context: Context): Long? {
        val projection = arrayOf(CalendarContract.Calendars._ID, CalendarContract.Calendars.NAME)
        val selection = "${CalendarContract.Calendars.VISIBLE} = 1"
        val cursor = context.contentResolver.query(
            CalendarContract.Calendars.CONTENT_URI,
            projection,
            selection,
            null,
            null
        )

        cursor?.let {
            if (it.moveToFirst()) {
                val calendarId = it.getLong(it.getColumnIndex(CalendarContract.Calendars._ID))
                it.close()
                return calendarId
            }
            it.close()
        }
        return null
    }

    // Method to check if an event with the same title and timeslot already exists
    private fun eventExists(context: Context, title: String, startTime: Double, endTime: Double): Boolean {
        val projection = arrayOf(CalendarContract.Events._ID, CalendarContract.Events.TITLE, CalendarContract.Events.DTSTART, CalendarContract.Events.DTEND)
        val selection = "${CalendarContract.Events.TITLE} = ? AND ${CalendarContract.Events.DTSTART} = ? AND ${CalendarContract.Events.DTEND} = ?"
        val selectionArgs = arrayOf(title, startTime.toString(), endTime.toString())
        
        val cursor = context.contentResolver.query(
            CalendarContract.Events.CONTENT_URI,
            projection,
            selection,
            selectionArgs,
            null
        )

        // If the cursor has any rows, it means the event already exists
        return cursor?.use {
            it.moveToFirst()
        } ?: false
    }

    // Method to set a reminder for the event using Calendar's built-in reminder system
    private fun setEventReminder(context: Context, eventId: Long, reminderTime: Int) {
        val values = ContentValues().apply {
            put(Reminders.EVENT_ID, eventId)
            put(Reminders.MINUTES, reminderTime) // Reminder time in minutes before the event
            put(Reminders.METHOD, Reminders.METHOD_ALERT) // Default method for reminder
        }

        // Insert the reminder into the Calendar
        context.contentResolver.insert(Reminders.CONTENT_URI, values)
    }
}
