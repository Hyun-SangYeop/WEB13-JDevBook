import db from '../../models';
import './index';

const addAlarm = async function (receiver: string, msg: string) {
  const receiverData = await db.models.User.findOne({
    where: { nickname: receiver },
    logging: false
  });
  const receiveridx: number = receiverData?.get().idx
    ? receiverData?.get().idx
    : -1;

  await db.models.Alarm.create(
    {
      useridx: receiveridx,
      message: msg
    },
    { logging: false }
  );
};

const getAlarmList = async function (receiver: string) {
  const receiverData = await db.models.User.findOne({
    where: { nickname: receiver },
    logging: false
  });
  const receiveridx: number = receiverData?.get().idx
    ? receiverData?.get().idx
    : -1;

  const allAlarms = await db.models.Alarm.findAll({
    where: { useridx: receiveridx },
    logging: false
  });
  const allAlarmsArray = allAlarms.map((data: any) => data.get().message);
  return allAlarmsArray;
};

export { addAlarm, getAlarmList };
