import * as Notifications from "expo-notifications";
import { useHabitStore } from "@/store/habit";
import { useSettingsStore } from "@/store/settings";
import { WEEKDAYS } from "@/constants/habit";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === "granted";
}

const parseTime = (timeStr: string) => {
  const [h, m] = timeStr.split(":");
  return { hour: parseInt(h, 10), minute: parseInt(m, 10) };
};

const isWithinQuietHours = (
  timeStr: string,
  quietStart: string,
  quietEnd: string
) => {
  const time = parseTime(timeStr);
  const start = parseTime(quietStart);
  const end = parseTime(quietEnd);

  const tMin = time.hour * 60 + time.minute;
  const sMin = start.hour * 60 + start.minute;
  const eMin = end.hour * 60 + end.minute;

  if (sMin > eMin) {
    // Overnight quiet hours (e.g., 22:00 to 07:00)
    return tMin >= sMin || tMin <= eMin;
  } else {
    // Daytime quiet hours
    return tMin >= sMin && tMin <= eMin;
  }
};

export async function syncNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { globalReminders, quietHours } = useSettingsStore.getState();
  if (!globalReminders) return;

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const { habits, habitOrder } = useHabitStore.getState();

  for (const id of habitOrder) {
    const habit = habits[id];
    if (!habit || !habit.reminder?.enabled || !habit.reminder?.time) continue;

    // Check quiet hours
    if (
      isWithinQuietHours(habit.reminder.time, quietHours.start, quietHours.end)
    ) {
      continue; // Skip scheduling if it falls within quiet hours
    }

    const time = parseTime(habit.reminder.time);

    if (habit.frequency.type === "daily") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Habit Reminder",
          body: `Time for your habit: ${habit.name}!`
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: time.hour,
          minute: time.minute
        }
      });
    } else if (habit.frequency.days) {
      for (const day of habit.frequency.days) {
        const dayIndex = WEEKDAYS.indexOf(day);
        const weekday = dayIndex + 1; // 1=Sunday, 7=Saturday

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Habit Reminder",
            body: `Time for your habit: ${habit.name}!`
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
            weekday,
            hour: time.hour,
            minute: time.minute
          }
        });
      }
    }
  }
}
