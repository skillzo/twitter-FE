import { ScrollView } from "react-native";
import React from "react";
import NotificationCard from "../../../components/notifications/NotificationCard";

export default function AllNotifications() {
  return (
    <ScrollView className="space-y--8 px-4 bg-white">
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </ScrollView>
  );
}
