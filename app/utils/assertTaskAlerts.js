import toMilliSeconds from './time';

const ALERT_TIMES = {
  daily: toMilliSeconds.day,
  weekly: toMilliSeconds.week,
  monthly: toMilliSeconds.month,
};

export default function assertTaskAlerts(lastAlert, frequency) {
  const currentDate = new Date().getTime();
  const taskAlertTime = ALERT_TIMES[frequency];
  if (lastAlert) {
    const needsAlert = currentDate - new Date(lastAlert).getTime() > taskAlertTime;
    return needsAlert;
  }
  return true;
}
