import React from "react";
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native'

class NotificationHelper{
    constructor(){}

    createTimeBasedNotification = async(date:Date, title:string, body:string, channelId:string) => {
        const trigger:TimestampTrigger = {
            type:TriggerType.TIMESTAMP,
            timestamp: date.getTime()
        };
        await notifee.createTriggerNotification({
            title:title,
            body:body,
            android:{
                channelId:channelId
            }
        }, trigger);
    }

    createNotificationChannel = async(id:string, name:string) => {
        await notifee.createChannel({
            id: id,
            name: name
        })
    }


}

export default new NotificationHelper;