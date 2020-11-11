import {fetchDuties, fetchRegularDuties} from '../../fauna'
import {getDateString, getWeekday} from '../date'

export async function getCurrentDuty() {
  const [regularDuties, duties] = await Promise.all([
    fetchRegularDuties(),
    fetchDuties(),
  ])
  const today = new Date()
  // today.setDate(4)
  const currentDate = getDateString(today)
  const currentWeekday = getWeekday(today)
  const currentDuty = duties.find(({date}) => date === currentDate)
  const currentRegularDuty = regularDuties.find(
    ({weekday}) => weekday === currentWeekday,
  )
  return {
    responsible: currentDuty?.responsible ?? currentRegularDuty.responsible,
    backup: currentDuty?.backup ?? currentRegularDuty.backup,
  }
}

export const getCurrentResponsible = async () =>
  (await getCurrentDuty()).responsible
