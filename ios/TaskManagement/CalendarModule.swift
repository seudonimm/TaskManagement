import Foundation
import EventKit
import React

@objc(CalendarModule)
class CalendarModule: NSObject {

    private let eventStore = EKEventStore()

    @objc func addEvent(_ title: String, description: String, location: String, startTime: Double, endTime: Double, successCallback: @escaping RCTResponseSenderBlock, errorCallback: @escaping RCTResponseSenderBlock) {

        // Request permission to access the calendar
        eventStore.requestAccess(to: .event) { (granted, error) in
            if granted {
                // Check if the event already exists
                if self.eventExists(title: title, startTime: startTime, endTime: endTime) {
                    errorCallback(["Event with the same title and time already exists!"])
                    return
                }

                // Create a new event if no duplicate exists
                let event = EKEvent(eventStore: self.eventStore)
                event.title = title
                event.startDate = Date(timeIntervalSince1970: startTime / 1000) // Convert milliseconds to seconds
                event.endDate = Date(timeIntervalSince1970: endTime / 1000) // Convert milliseconds to seconds
                event.notes = description
                event.location = location
                event.calendar = self.eventStore.defaultCalendarForNewEvents

                do {
                    try self.eventStore.save(event, span: .thisEvent)
                    successCallback(["Event added successfully!"])
                } catch let error {
                    errorCallback([error.localizedDescription])
                }
            } else {
                errorCallback(["Permission denied to access calendar."])
            }
        }
    }

    // Check if the event already exists
    private func eventExists(title: String, startTime: Double, endTime: Double) -> Bool {
        let startDate = Date(timeIntervalSince1970: startTime / 1000)
        let endDate = Date(timeIntervalSince1970: endTime / 1000)

        // Predicate to fetch events in the time range
        let predicate = eventStore.predicateForEvents(withStart: startDate, end: endDate, calendars: nil)
        let events = eventStore.events(matching: predicate)

        // Check if any event with the same title already exists
        for event in events {
            if event.title == title {
                return true
            }
        }
        return false
    }
}
