import {Fragment, Suspense} from 'react'
import classNames from 'classnames'
import {graphql, preloadQuery, usePreloadedQuery} from 'react-relay/hooks'
import Loader from '@jetbrains/ring-ui/components/loader/loader'
import {H1} from '@jetbrains/ring-ui/components/heading/heading'

import RelayEnvironment from '../utils/relay-environment'
import {MyContext, TeamContext} from '../utils/contexts'

import RegularDuty from './regular-duty'
import styles from './calendar.css'
import Duty, {getDateString} from './duty'
import pipe from '../utils/pipe'

const Query = graphql`
  query calendarQuery {
    regularDuties {
      id
      items {
        weekday
        ...regularDutyFragment
      }
    }
    duties {
      id
      items {
        date
        ...dutyFragment
      }
    }
    team {
      ...userSelectTeamFragment
    }
    me {
      ...userSelectUserIdFragment
    }
  }
`
const preloadedQuery = preloadQuery(RelayEnvironment, Query, {query: ''})

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const months = [[]]

for (
  let monthIndex = 0, date = new Date(), month = date.getMonth();
  monthIndex < 2;
  date.setDate(date.getDate() + 1)
) {
  const currentMonth = date.getMonth()
  if (currentMonth !== month) {
    month = currentMonth
    monthIndex++
    months.push([])
  }

  if (![6, 0].includes(date.getDay())) {
    months[monthIndex].push(new Date(date))
  }
}

const getMonth = date =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date)

const getWeekday = date =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(date)

function Calendar() {
  const {regularDuties, duties, team, me} = usePreloadedQuery(
    Query,
    preloadedQuery,
  )
  const getRegularDuty = weekday =>
    regularDuties.items.find(duty => duty.weekday === weekday)
  const getDuty = dateString =>
    duties.items.find(duty => duty.date === dateString)

  return (
    <div className={styles.calendar}>
      <TeamContext.Provider value={team}>
        <MyContext.Provider value={me}>
          {weekdays.map(weekday => (
            <RegularDuty
              key={weekday}
              weekday={weekday}
              regularDuty={getRegularDuty(weekday)}
              listId={regularDuties.id}
            />
          ))}
          {months.slice(0, -1).map(dates => {
            if (dates.length === 0) {
              return null
            }

            const month = getMonth(dates[0])

            return (
              <Fragment key={month}>
                <div className={styles.month}>
                  <H1 className={styles.monthHeading}>{month}</H1>
                </div>
                {dates.map(date => (
                  <div
                    className={styles.day}
                    style={{gridColumnStart: date.getDay()}}
                    key={date.getDate()}
                  >
                    <Duty
                      date={date}
                      duty={pipe(date, getDateString, getDuty)}
                      regularDuty={pipe(date, getWeekday, getRegularDuty)}
                      listId={duties.id}
                    />
                  </div>
                ))}
              </Fragment>
            )
          })}
        </MyContext.Provider>
      </TeamContext.Provider>
    </div>
  )
}

export default function CalendarWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <Calendar />
    </Suspense>
  )
}
