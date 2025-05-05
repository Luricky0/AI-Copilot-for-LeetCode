import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleCheck, faHeart } from '@fortawesome/free-solid-svg-icons'
import RecentsListView from './RecentsListView'

const UserCard = ({ likedProblemsIDs, completedProblemsIDs }: any) => {
  const user = useUserContext()
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
      </div>
    </div>
  )
}
export default UserCard
