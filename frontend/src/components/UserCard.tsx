import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCircleCheck,
  faHeart,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import RecentsListView from './RecentsListView'
import { useNavigate } from 'react-router'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

const UserCard = ({ likedProblemsIDs, completedProblemsIDs }: any) => {
  const user = useUserContext()
  const navigate = useNavigate()
  const onLogout = () => {
    user.removeToken()
    navigate('/')
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 rounded-lg  bg-white border-2">
        <p className="text-3xl m-2 font-menlo font-bold">Hi, {user.username}</p>
        <div className="w-full grid grid-cols-[1fr_1fr] items-center">
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              style={{ color: 'red' }}
            />
            <p className="text-2xl font-semibold font-menlo">
              {likedProblemsIDs ? likedProblemsIDs.length : 0}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon
              icon={faCheck}
              size="2x"
              style={{ color: 'green' }}
            />
            <p className="text-2xl font-semibold font-menlo">
              {completedProblemsIDs ? completedProblemsIDs.length : 0}
            </p>
          </div>
        </div>
        <div className="w-full h-28 p-2">
          <CalendarHeatmap
            startDate={new Date('2016-06-01')}
            endDate={new Date('2016-12-31')}
            values={[
              { date: '2016-01-01', count: 12 },
              { date: '2016-01-22', count: 122 },
              { date: '2016-01-30', count: 38 },
            ]}
            classForValue={(value: { count: number }) =>
              value ? `color-github-${Math.min(value.count, 4)}` : 'color-empty'
            }
          />
        </div>

        <div className="w-full p-2">
          <h3 className="font-semibold text-xl">
            <FontAwesomeIcon
              icon={faHeart}
              size="1x"
              style={{ color: 'red' }}
              className="mx-1"
            />
            Recent Likes
          </h3>
          <RecentsListView problemList={likedProblemsIDs} />
        </div>

        <div className="w-full p-2">
          <h3 className="font-semibold text-xl">
            <FontAwesomeIcon
              icon={faCircleCheck}
              size="1x"
              style={{ color: 'green' }}
              className="mx-1"
            />
            Recent Completes
          </h3>
          <RecentsListView problemList={completedProblemsIDs} />
        </div>

        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="2x"
          className="mb-2 cursor-pointer"
          onClick={() => onLogout()}
        />
      </div>
    </div>
  )
}
export default UserCard
