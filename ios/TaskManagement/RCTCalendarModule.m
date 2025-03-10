#import <Foundation/Foundation.h>
#import <EventKit/EventKit.h>
#import <React/RCTBridgeModule.h>

@interface RCTCalendarModule : NSObject <RCTBridgeModule>

@end

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

// Request permission to access the calendar and add an event
RCT_EXPORT_METHOD(addEvent:(NSString *)title
                  description:(NSString *)description
                  location:(NSString *)location
                  startTime:(nonnull NSNumber *)startTime
                  endTime:(nonnull NSNumber *)endTime
                  reminderTime:(nonnull NSNumber *)reminderTime // Reminder time in minutes before the event
                  successCallback:(RCTResponseSenderBlock)successCallback
                  errorCallback:(RCTResponseSenderBlock)errorCallback)
{
  EKEventStore *eventStore = [[EKEventStore alloc] init];
  
  // Request permission to access the calendar
  [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      // Ensure start time is before end time
      NSTimeInterval startTimeInterval = [startTime doubleValue] / 1000; // Convert from milliseconds to seconds
      NSTimeInterval endTimeInterval = [endTime doubleValue] / 1000; // Convert from milliseconds to seconds
      
      if (startTimeInterval > endTimeInterval) {
        errorCallback(@[@"The start date must be before the end date."]);
        return;
      }

      // Check if an event with the same title and time already exists
      if ([self eventExistsWithTitle:title startTime:startTimeInterval endTime:endTimeInterval eventStore:eventStore]) {
        errorCallback(@[@"Event with the same title and time already exists!"]);
        return;
      }

      // Create the event if it doesn't exist
      EKEvent *event = [EKEvent eventWithEventStore:eventStore];
      event.title = title;
      event.startDate = [NSDate dateWithTimeIntervalSince1970:startTimeInterval]; // Convert from seconds
      event.endDate = [NSDate dateWithTimeIntervalSince1970:endTimeInterval]; // Convert from seconds
      event.notes = description;
      event.location = location;
      event.calendar = [eventStore defaultCalendarForNewEvents];

      // Add reminder alarm to the event
      EKAlarm *alarm = [EKAlarm alarmWithRelativeOffset:-[reminderTime doubleValue] * 60]; // reminderTime is in minutes
      [event addAlarm:alarm];
      
      NSError *saveError = nil;
      [eventStore saveEvent:event span:EKSpanThisEvent commit:YES error:&saveError];
      
      if (saveError) {
        errorCallback(@[saveError.localizedDescription]);
      } else {
        successCallback(@[@"Event added successfully with reminder!"]);
      }
    } else {
      errorCallback(@[@"Permission denied to access calendar."]);
    }
  }];
}

// Check if an event with the same title and time already exists
- (BOOL)eventExistsWithTitle:(NSString *)title startTime:(NSTimeInterval)startTime endTime:(NSTimeInterval)endTime eventStore:(EKEventStore *)eventStore
{
  NSDate *startDate = [NSDate dateWithTimeIntervalSince1970:startTime]; // Convert from seconds
  NSDate *endDate = [NSDate dateWithTimeIntervalSince1970:endTime]; // Convert from seconds
  
  // Ensure consistency in time zone handling
  NSTimeZone *timeZone = [NSTimeZone systemTimeZone]; // System time zone
  NSCalendar *calendar = [NSCalendar currentCalendar];
  [calendar setTimeZone:timeZone];
  
  // Fetch events in the given time range
  NSPredicate *predicate = [eventStore predicateForEventsWithStartDate:startDate endDate:endDate calendars:nil];
  NSArray *events = [eventStore eventsMatchingPredicate:predicate];
  
  // Check for duplicate events with the same title and exact start and end times
  for (EKEvent *event in events) {
    // Compare titles, start times, and end times precisely
    if ([event.title isEqualToString:title]) {
      // Check for exact match on start and end date, down to milliseconds
      NSTimeInterval eventStartTime = [event.startDate timeIntervalSince1970];
      NSTimeInterval eventEndTime = [event.endDate timeIntervalSince1970];
      
      if (fabs(eventStartTime - startTime) < 1.0 && fabs(eventEndTime - endTime) < 1.0) {
        return YES; // Duplicate found
      }
    }
  }
  return NO; // No duplicates found
}

@end
